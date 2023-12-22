import { fromMarkdown } from 'mdast-util-from-markdown'

// 扩展: 用于将 markdown 文字转化成 token
import { gfm } from 'micromark-extension-gfm'
import { frontmatter } from 'micromark-extension-frontmatter'

// 扩展: 用于将 token 转化成 mdast
import { gfmFromMarkdown } from 'mdast-util-gfm'
import { frontmatterFromMarkdown } from 'mdast-util-frontmatter'

import { visit } from 'unist-util-visit'
import { toHast } from 'mdast-util-to-hast'

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

  /**
   * 将 markdown ast 中的 code 节点的 lang 属性映射到 hast 中
   */
  visit(mdast, 'code', function (node) {
    if (!node.data) node.data = {}
    if (!node.data.hProperties) node.data.hProperties = {}
    node.data.hProperties.lang = node.lang
  })

  /**
   * 这个 hast 里可能会包含 h5源码(type: 'raw')
   * 需要将他们转换成 hast
   */
  const hast = toHast(mdast, {
    allowDangerousHtml: true,
  })

  return hast
}

export { markdownParse }
