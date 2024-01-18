import { markdownParse } from './parse'

Component({
  options: {
    styleIsolation: 'shared',
  },
  properties: {
    value: {
      type: String,
      value: '',
    },
  },
  data: {
    tree: { children: [] },
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
  },
})
