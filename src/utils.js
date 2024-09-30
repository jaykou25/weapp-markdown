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
    node.tagName === 'pre' ||
    node.tagName === 'li' ||
    node.tagName === 'ol' ||
    node.tagName === 'ul'
  )
}

/**
 * ast 中 hProperties 的值在转化成 hast 后会映射到 properties 属性中
 * @param {*} node ast节点
 * @param {*} properties 属性对象
 */
export const setHProperties = (node, properties) => {
  if (!node.data) node.data = {}
  if (!node.data.hProperties) node.data.hProperties = {}

  Object.keys(properties).forEach((key) => {
    node.data.hProperties[key] = properties[key]
  })
}

/**
 * 设置 hast 节点的属性
 * @param {*} node hast节点
 * @param {*} properties 属性对象
 */
export const setProperties = (node, properties) => {
  if (!node.properties) node.properties = {}

  Object.keys(properties).forEach((key) => {
    node.properties[key] = properties[key]
  })
}

export function visitTree(tree, fn, options) {
  const { childrenName = 'children' } = options || {}

  if (tree[childrenName] && Array.isArray(tree[childrenName])) {
    tree[childrenName].forEach((item) => {
      visitTree(item, fn, options)
    })
  }

  if (fn) {
    fn(tree)
  }
}

export const getHastNodeTextValue = (node) => {
  let str = ''

  visitTree(node, (item) => {
    if (item.type === 'text') {
      str += item.value
    }
  })

  return str
}
