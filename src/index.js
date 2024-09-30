import { markdownParse } from './parse'

Component({
  properties: {
    value: {
      type: String,
      value: '',
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
      console.log('created: ')
      // console.log('on created in src', toTree())
      // console.log('on created mdtohast', mdToHast)
    },
  },
  methods: {
    // 解析 markdwon 文字
    parseMdText(value) {
      // const treeOri = mdToHast(value, defaultSchema)
      const treeOri = markdownParse(value)
      console.log('解析完毕 text', treeOri)
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
      const { blockText } = detail
      this.setData({
        blockCSSShow: true,
        blockShow: true,
        blockText: blockText,
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
