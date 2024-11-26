// import { markdownParse } from './parse'
import { getHastNodeTextValue } from './utils'

const { markdownParse } = require('./parse.js')

Component({
  properties: {
    value: {
      type: String,
      value: '',
    },
    patchTree: {
      type: null,
      value: undefined,
    },
    patchSchema: {
      type: null,
      value: undefined,
    },
  },
  data: {
    tree: { children: [] },
    linkCSSShow: false,
    linkShow: false,
    linkHref: '',
    linkText: '',
    blockCSSShow: false,
    blockShow: false,
    blockText: '',
    blockNode: {},
    canScroll: true,
  },
  observers: {
    value: function (value) {
      console.log('组件 value 变动监听', value)
      // 当属性 value 变动时重新解析成 html tree
      this.parseMdText(value)
    },
  },
  lifetimes: {
    created: function () {
      console.log('created: ', global.document)
      console.log('先加载一个方法')
      console.log('想写入一个方法', this)
      // console.log('on created in src', toTree())
      // console.log('on created mdtohast', mdToHast)
    },
  },
  methods: {
    // 解析 markdwon 文字
    parseMdText(value) {
      // const treeOri = mdToHast(value, defaultSchema)
      const treeOri = markdownParse(value, {
        patchTree: this.data.patchTree,
        patchSchema: this.data.patchSchema,
      })
      this.setData({ tree: treeOri })
    },
    closeLinkDialog() {
      this.setData({ linkCSSShow: false })

      setTimeout(() => {
        this.setData({ linkShow: false })
      }, 400)
    },
    closeBlockDialog() {
      this.setData({ blockCSSShow: false })

      setTimeout(() => {
        this.setData({ blockShow: false })
      }, 400)
    },
    linkClick(e) {
      const { detail } = e
      const { href, title } = detail
      this.setData({
        linkCSSShow: true,
        linkShow: true,
        linkHref: href,
        linkText: title,
      })
    },
    blockLongPress(e) {
      console.log('触发blockLongPress', e)
      const { detail } = e
      const { parentNode } = detail
      this.setData({
        blockCSSShow: true,
        blockShow: true,
        blockText: getHastNodeTextValue(parentNode),
        blockNode: parentNode,
      })
    },
    copy(e) {
      const { value } = e.currentTarget.dataset
      wx.setClipboardData({
        data: value,
        success: () => {
          this.closeLinkDialog()
        },
      })
    },
    // 小程序图片点击后的全屏预览
    previewImage(e) {
      const { detail } = e
      const { imgsrc } = detail
      wx.previewImage({
        current: imgsrc,
        urls: this.data.tree.srcs,
      })
    },
  },
})
