import { fromMarkdown } from 'mdast-util-from-markdown'

Component({
  properties: {
    value: {
      type: String,
      value: '',
    },
  },
  data: {
    tree: [],
  },
  observers: {
    value: function (value) {
      console.log('组件 value 变动监听', value)
      // 当属性 value 变动时重新解析成 html tree
      // this.parseMdText(value)
    },
  },
  lifetimes: {
    created: function () {
      console.log('created: ', 'frommarkdown', fromMarkdown)
      // console.log('on created in src', toTree())
      // console.log('on created mdtohast', mdToHast)
    },
  },
  methods: {
    // 解析 markdwon 文字
    parseMdText() {
      // const treeOri = mdToHast(value, defaultSchema)
      // this.setData({ tree: treeOri })
    },
  },
})
