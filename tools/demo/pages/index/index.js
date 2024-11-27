import { setKey, setLineInfo, setValue } from '../../constant'
import { DataSource } from './data-source'

Component({
  data: {
    dataSource: DataSource,
  },
  methods: {
    toDetail(e) {
      const { currentTarget } = e
      const { id, parentIndex } = currentTarget.dataset || {}

      const target = this.data.dataSource[parentIndex].data.find(
        (li) => li.id === id
      )

      setValue(target.value)
      setKey(target.key)
      setLineInfo(target.lineInfo)

      wx.navigateTo({
        url: '/pages/detail/index',
      })
    },
  },
})
