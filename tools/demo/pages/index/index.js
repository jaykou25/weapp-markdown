import { setValue } from '../../constant'

Component({
  data: {
    list: [
      {
        id: 1,
        title: '用例: List',
        value: '### List',
        desc: 'hi',
      },
      {
        id: 2,
        title: '用例: 图片',
        value: '### 图片',
      },
    ],
  },
  methods: {
    toDetail(e) {
      const { currentTarget } = e
      const id = currentTarget.dataset?.id

      const target = this.data.list.find((li) => li.id === id)

      setValue(target.value)

      wx.navigateTo({
        url: '/pages/detail/index',
      })
    },
  },
})
