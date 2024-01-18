import { fromMarkdown } from 'mdast-util-from-markdown'

// 扩展: 用于将 markdown 文字转化成 token
import { gfm } from 'micromark-extension-gfm'
import { frontmatter } from 'micromark-extension-frontmatter'

// 扩展: 用于将 token 转化成 mdast
import { gfmFromMarkdown } from 'mdast-util-gfm'
import { frontmatterFromMarkdown } from 'mdast-util-frontmatter'

import { visit } from 'unist-util-visit'
import { toHast } from 'mdast-util-to-hast'
import { raw } from 'hast-util-raw'
import { remove } from 'unist-util-remove'
import { sanitize, defaultSchema } from 'hast-util-sanitize'

import { isNodeBlock } from './utils'

// 用于高亮代码
import Prism from 'prismjs'
Prism.manual = true

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

/**
 * 这里用了一系列工具来处理 markdown 文字的解析.
 * 我会详情备注这些工具的作用.
 *
 * 总的目标是将 markdown 文字转换成 html 树(hast)
 * 小程序页面拿到 hast 后就能遍历节点进行渲染
 */

function markdownParse(text) {
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

  console.log('mdast', mdast)

  /**
   * 将 markdown ast 中的 code 节点的 lang 属性映射到 hast 中
   */
  visit(mdast, function (node) {
    if (node.type === 'code') {
      if (!node.data) node.data = {}
      if (!node.data.hProperties) node.data.hProperties = {}
      node.data.hProperties.lang = node.lang
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
   */
  const hastWithRaw = raw(hast)

  console.log('hastWithRaw', hastWithRaw)

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

  /** 移除上兄弟节点是 block 元素的空白节点 */
  remove(hastWithRaw, (node, index, parent) => {
    /** 有些情况下 value 值还包含空格 */
    if (node.type === 'text' && node.value.replaceAll(' ', '') === '\n') {
      /** children 在第一位的空节点去掉 */
      if (index === 0) {
        return true
      }

      if (index > 0) {
        const sib = parent.children[index - 1]

        if (isNodeBlock(sib)) {
          return true
        }
      }
      return false
    }

    return false
  })

  /**
   * 遍历 element 元素:
   * 处理 tagName: pre > code, 将内容高亮
   */
  visit(hastWithRaw, (node) => {
    if (node.type === 'element') {
      if (node.tagName === 'pre') {
        /**
         * 找出 pre 下面 tagName 是 code 的元素 (注意要找 pre > code, 单纯的 code 元素可能是行内 code)
         * 将 code 元素里的值高亮处理
         */
        console.log('处理pre', node)
        if (node.children && node.children.length > 0) {
          node.children.forEach((child) => {
            if (child.tagName === 'code') {
              handleCode(child)
            }
          })
        }
      }
    }
  })

  function handleCode(node) {
    if (node.children && node.children.length > 0) {
      const lan = node.properties.lang
      node.children.forEach((child) => {
        if (lan) {
          const text = Prism.highlight(
            child.value,
            Prism.languages[extensionMap[lan] || lan] || Prism.languages.txt,
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

  // 将一些属性加入白名单
  defaultSchema.attributes['video'] = ['src', 'controls', 'style']
  defaultSchema.tagNames.push('video')
  defaultSchema.attributes['*'].push('style')
  defaultSchema.attributes['*'].push('className')

  console.log('hast with remove', hastWithRaw)

  return sanitize(hastWithRaw, defaultSchema)
}

export { markdownParse }
