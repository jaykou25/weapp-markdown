import { DATA } from '../../constant'

Component({
  data: {
    value: '',
  },
  methods: {
    onLoad() {
      console.log('value', DATA.value)
      this.setData({
        value: DATA.value,
      })
    },
    change() {
      this.setData({
        value: this.data.value + '1',
      })
    },
  },
})
