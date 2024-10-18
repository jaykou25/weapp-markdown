import {
  getHastNodeTextValue,
  isBlockNode,
  isHeaderNode,
  isLeafBlockNode,
} from './utils'

describe('getHastNodeTextValue', () => {
  test('获取节点上的纯文本, 包含 code, link 元素', () => {
    const node = {
      type: 'element',
      tagName: 'p',
      children: [
        {
          type: 'text',
          value: 'markdown 语法 ',
        },
        {
          type: 'element',
          tagName: 'code',
          children: [{ type: 'text', value: '[链接文本](url)' }],
        },
        { type: 'text', value: '\n示例: ' },
        {
          type: 'element',
          tagName: 'a',
          children: [{ type: 'text', value: '苹果官网' }],
        },
      ],
    }

    const text = getHastNodeTextValue(node)
    expect(text).toBe('markdown 语法 [链接文本](url)\n示例: 苹果官网')
  })
})

describe('判断 node 节点类型', () => {
  test('isHeaderNode', () => {
    expect(isHeaderNode('h1')).toBe(true)
    expect(isHeaderNode('H1')).toBe(true)
    expect(isHeaderNode('h2')).toBe(true)
    expect(isHeaderNode('h3')).toBe(true)
    expect(isHeaderNode('h9')).toBe(true)

    expect(isHeaderNode('ha')).toBe(false)
  })

  test('isBlockNode', () => {
    expect(isBlockNode('p')).toBe(true)
    expect(isBlockNode('h1')).toBe(true)
    expect(isBlockNode('li')).toBe(true)
  })
})

describe('isLeafBlockNode', () => {
  test('1', () => {
    const node = {
      type: 'element',
      tagName: 'li',
      children: [{ type: 'text' }],
    }
    expect(isLeafBlockNode(node)).toBe(true)
  })

  test('2', () => {
    const node = {
      type: 'element',
      tagName: 'p',
      children: [
        { type: 'text' },
        { type: 'element', tagName: 'code', children: [{ type: 'text' }] },
        { type: 'element', tagName: 'a', children: [{ type: 'text' }] },
      ],
    }
    expect(isLeafBlockNode(node)).toBe(true)
  })

  test('3', () => {
    const node = {
      type: 'element',
      tagName: 'ol',
      children: [
        { type: 'element', tagName: 'li', children: [{ type: 'text' }] },
      ],
    }
    expect(isLeafBlockNode(node)).toBe(false)
  })
})
