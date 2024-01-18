/**
 * 判断 node 节点是不是inline元素
 */
export const isNodeInline = (node) => {
  return (
    node.type === 'text' ||
    node.tagName === 'code' ||
    node.tagName === 'input' ||
    node.tagName === 'a' ||
    node.tagName === 'em' ||
    node.tagName === 'strong'
  )
}

/**
 * 判断 node 节点是不是 block 元素
 */
export const isNodeBlock = (node) => {
  return (
    node.tagName === 'p' ||
    node.tagName === 'blockquote' ||
    node.tagName === 'pre'
  )
}
