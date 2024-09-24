import {
  ImageCase,
  ImageCaseFigure2,
  ImageCaseTwoInRowH5,
  ImageCaseTwoInRowH52,
} from '../tools/demo/pages/index/case'

const { markdownParse } = require('../testBundle/parse')

// 换行问题
describe('换行问题', () => {
  test('两个 block 段落间的换行要去掉', async () => {
    const value = '段落1\n\n段落2'

    const ret = markdownParse(value)

    const children = ret.children
    expect(children.length).toBe(2)
    expect(children[0].tagName).toBe('p')
    expect(children[1].tagName).toBe('p')
  })

  test('两个 inline 段落间的换行不要去掉', async () => {
    const value = '**加粗**\n__加粗__'

    const ret = markdownParse(value)

    const pChildren = ret.children[0].children
    expect(pChildren.length).toBe(3)
    expect(pChildren[1].type).toBe('text')
    expect(pChildren[1].value).toBe('\n')
  })

  test('解析figure 标签时, 图片和图题之间的空白节点要去掉', () => {
    const ret = markdownParse(ImageCaseFigure2)
    const figure = ret.children[0]
    expect(figure.children[0].tagName).toBe('img')
    expect(figure.children[1].tagName).toBe('figcaption')
  })
})

describe('图片相关', () => {
  test('两个h5图片并列写', () => {
    const ret = markdownParse(ImageCaseTwoInRowH5)
    const imgPara = ret.children[1]

    expect(imgPara.children.length).toBe(2)
    expect(imgPara.children[0].tagName).toBe('img')
    expect(imgPara.children[1].tagName).toBe('img')
  })

  test('两个h5图片换行写会解析成两个段落', () => {
    const ret = markdownParse(ImageCaseTwoInRowH52)
    const rootChilren = ret.children

    expect(rootChilren[1].tagName).toBe('img')

    expect(rootChilren[2].type).toBe('text')
    expect(rootChilren[2].value).toBe('\n')

    expect(rootChilren[3].tagName).toBe('img')
  })
})

describe('在解析时收集所有的图片', () => {
  test('收集所有的图片, 图片地址要去重', () => {
    const ret = markdownParse(ImageCase)

    expect(ret.srcs.length).toBe(1)

    const firstSrc = ret.srcs[0]
    expect(firstSrc.includes('https://th.bing.com')).toBe(true)
  })
})
