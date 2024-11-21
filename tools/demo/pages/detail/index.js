import { DATA } from '../../constant'

Component({
  data: {
    value: '',
    key: '',
    patchTreeForComment: (node) => {
      if (node.type === 'element') {
        console.log('patch tree', node)
        console.log('patch tree DATA', DATA.lineInfo)
      }
    },
  },
  methods: {
    onLoad() {
      console.log('value', DATA.value)
      this.setData({
        value: DATA.value,
        key: DATA.key,
      })
    },
    change() {
      this.setData({
        value: this.data.value + '1',
      })
    },
  },
})
