import { getHastNodeTextValue } from './utils'

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
