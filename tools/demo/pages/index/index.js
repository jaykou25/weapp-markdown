import { setValue } from '../../constant'

Component({
  data: {
    list: [
      {
        id: 1,
        title: '标题 Headings',
        value:
          '# A first-level heading\n## A second-level heading\n### A third-level heading',
      },
      {
        id: 2,
        title: '装饰文字 Styleing text',
        value:
          '**加粗**\n__加粗__\n*斜体*\n_斜体_\n~~划线~~\n**加粗内置 _斜体_**\n***加粗并且斜体***\n这是一个<sub>下标</sub> \n这是一个<sup>上标</sup>',
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
