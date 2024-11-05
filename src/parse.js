import { fromMarkdown } from 'mdast-util-from-markdown'

// 扩展: 用于将 markdown 文字转化成 token
import { gfm } from 'micromark-extension-gfm'
import { frontmatter } from 'micromark-extension-frontmatter'

// 扩展: 用于将 token 转化成 mdast
import { gfmFromMarkdown } from 'mdast-util-gfm'
import { frontmatterFromMarkdown } from 'mdast-util-frontmatter'

import { visit } from 'unist-util-visit'

/**
 * 关于换行的问题
 * 一个紧贴着的换行比如 '第一行\n第二行' 会解析成 {type: 'text', value: '第一行\n第二行'}
 *
 * 非紧贴换行比如 `第一行\n\n第二行' 会解析成
 * [
 *   {type: 'element', children: [{type: 'text', value: '第一行}]},
 *   {type: 'text', value: '\n'},
 *   {type: 'element', children: [{type: 'text', value: '第二行}]},
 * ]
 */

/**
 * 因为正常的每一个段落都会有一个 marginBottom, 所以一个空节点, 如果它的上兄弟节点是一个 block 元素, 那么这个空节点不需要显示.
 * 但是如果它的上兄弟节点是一个 inline 元素, 那么这个空节点是需要被用作换行的.
 * 比如 '**加粗**\n__加粗__' 在一个段落里的换行, 它的 hast 是这样:
 * {
 *   type: 'element', tagName: 'p', children: [
 *     { type: 'element', tagName: 'strong' },
 *     { type: 'text', value: '\n' },
 *     { type: 'element', tagName: 'strong' },
 *   ]
 * }
 *
 * 这个空节点是要用于换行的.
 */
import { toHast } from '@jay.kou/mdast-util-to-hast'
import { raw } from 'hast-util-raw'
import { sanitize, defaultSchema } from 'hast-util-sanitize'

// 用于高亮代码
import Prism from 'prismjs'

import {
  getHastNodeTextValue,
  isBlockNode,
  isHeaderNode,
  isLeafBlockNode,
  setHProperties,
  setProperties,
} from './utils'

Prism.manual = true
global.Prism = Prism

const extensionMap = {
  vue: 'markup',
  'vue-html': 'markup',
  html: 'markup',
  md: 'markdown',
  rb: 'ruby',
  ts: 'typescript',
  py: 'python',
  sh: 'bash',
  yml: 'yaml',
  styl: 'stylus',
  kt: 'kotlin',
  rs: 'rust',
}

function handleCode(node) {
  if (node.children && node.children.length > 0) {
    const lan = node.properties.lang
    node.children.forEach((child) => {
      // 在测试环境下跳过高亮处理
      if (process.env.NODE_ENV === 'test') return

      if (lan) {
        const text = Prism.highlight(
          child.value,
          Prism.languages[extensionMap[lan] || lan],
          lan
        )

        child.value = text
      } else {
        const text = Prism.highlight(child.value, Prism.languages.txt, 'txt')

        child.value = text
      }
    })
  }
}

/**
 * 这里用了一系列工具来处理 markdown 文字的解析.
 * 我会详情备注这些工具的作用.
 *
 * 总的目标是将 markdown 文字转换成 html 树(hast)
 * 小程序页面拿到 hast 后就能遍历节点进行渲染
 */

export function markdownParse(text) {
  /**
   * fromMarkdown 函数的作用是将 markdown 文字转换成 mdast(markdown 抽象语法树)
   * 它支持传入扩展, 用来识别一些特定的语法, 比如 GFM, math 等.
   * 扩展分为两种, 一种是用于将文字转成 tokens, 另一种是将 token 转化成 mdast.
   */

  // todo: math 扩展
  const mdast = fromMarkdown(text, {
    extensions: [gfm(), frontmatter()],
    mdastExtensions: [gfmFromMarkdown(), frontmatterFromMarkdown()],
  })

  visit(mdast, function (node) {
    /** 将 markdown ast 中的 code 节点的 lang 属性映射到 hast 中 */
    if (node.type === 'code') {
      setHProperties(node, { lang: node.lang })
    }
  })

  /**
   * toHast 函数的作用是将 mdast(markdown 抽象语法树) 转换成 hast(html 抽象语法树)
   */
  const hast = toHast(mdast, {
    /**
     * markdown 文本里如果包含 h5 源码, 默认是被忽略转换的.
     * 比如 '<p>para</p>' 默认会转换成: {type: 'root', children: []}
     * 在开启 allowDangerousHtml: true 后 h5 源码部分会作为 type: raw 被转换进来. {type: 'root', children: [{type: 'raw', value: '<p>para</p>'}]}
     */
    allowDangerousHtml: true,
  })

  /**
   * raw 函数的作用是把上面的 hast 树中的 type 为 raw 的部分转化成 html 树.
   *
   * 暂定不处理换行问题. 虽然这会导致小程序端和 web 端的表现在有些情况下有差异.
   * 比如: 1. '<img /><img />' 两个img 紧挨在一起写, 会被解析成:
   * [
   *   {type: 'element', tagName: 'img'},
   *   {type: 'element', tagName: 'img'}
   * ]
   *
   * 而 2. '<img />\n<img />' 两个img 换行写, 会被解析成:
   * [
   *   {type: 'element', tagName: 'img'},
   *   {type: 'text', value: '\n'},
   *   {type: 'element', tagName: 'img'}
   * ]
   * 这会导致小程序端两张图片会换行, 而 web 端则不会换行, 因为 web 端 white-space 默认是 normal, 会把换行符合并成空格.
   *
   * 本库暂时不对这个差异做处理, 因为很难做到两边统一.
   *
   */
  const hastWithRaw = raw(hast)

  /**
   * 遍历 element 元素:
   * 处理 tagName: pre > code, 将内容高亮
   * 处理 a 标签, 把 a 标签中的纯文本赋到属性上.
   * 收集所有的图片地址, 用于图片集预览
   * 给 block 节点赋上 isBlockNode: blockNode指的是样式上的块节点,
   * 比如 p, div, ul, ol, li, h1. 与之对应的是 inlineNode
   *
   * 给 block 节点赋上 isLeafBlockNode: leafBlockNode 指的是最靠近叶子节点的 blockNode.
   * 比如一个套嵌树 ol => li => ol => li => text, 只有最后一个 li 才是 leafBlockNode.
   * 这对于在某些场景下判断是否要显示节点有帮助.
   *
   * 给 block 节点赋上 isHeaderNode: headerNode 指的是 tagName为 h1, h2, h3, h4, h5, h6.
   */
  const srcs = []
  visit(hastWithRaw, (node) => {
    if (node.type === 'element') {
      if (node.tagName === 'pre') {
        /**
         * 找出 pre 下面 tagName 是 code 的元素 (注意要找 pre > code, 单纯的 code 元素可能是行内 code)
         * 将 code 元素里的值高亮处理
         */
        if (node.children && node.children.length > 0) {
          node.children.forEach((child) => {
            if (child.tagName === 'code') {
              handleCode(child)
              setProperties(child, { isCodeNode: true })
            }
          })
        }
      }

      if (node.tagName === 'a') {
        setProperties(node, { linkText: getHastNodeTextValue(node) })
      }

      if (node.tagName === 'img') {
        srcs.push(node.properties.src)
      }

      setProperties(node, { isBlockNode: isBlockNode(node.tagName) })
      setProperties(node, { isLeafBlockNode: isLeafBlockNode(node) })
      setProperties(node, { isHeaderNode: isHeaderNode(node.tagName) })
    }
  })

  // 将一些属性加入白名单
  defaultSchema.attributes['video'] = ['src', 'controls', 'style']
  defaultSchema.tagNames.push('video')
  defaultSchema.tagNames.push('figure')
  defaultSchema.tagNames.push('figcaption')
  defaultSchema.attributes['*'].push('style')
  defaultSchema.attributes['*'].push('className')
  defaultSchema.attributes['*'].push('linkText')
  defaultSchema.attributes['*'].push('isBlockNode')
  defaultSchema.attributes['*'].push('isLeafBlockNode')
  defaultSchema.attributes['*'].push('isHeaderNode')
  defaultSchema.attributes['*'].push('isCodeNode')

  const afterSanitize = sanitize(hastWithRaw, defaultSchema)

  // srcs 要去重
  const srcsSet = new Set(srcs)
  afterSanitize.srcs = Array.from(srcsSet)
  return afterSanitize
}

export default { markdownParse }
