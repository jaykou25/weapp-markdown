import { DATA } from '../../constant'

Component({
  data: {
    value: '',
    key: '',
    patchTreeForComment: (node, options) => {
      const { setProperties } = options
      if (node.type === 'element') {
        const startLine = node.position?.start.line
        if (startLine in DATA.lineInfo) {
          setProperties(node, { hasComment: true })
        }
      }
    },
    // 出于安全原因, 树节点中不在白名单中的属性都会被过滤掉.
    patchSchemaForComment: (defaultSchema) => {
      defaultSchema.attributes['*'].push('hasComment')
    },
    commentShow: false,
    commentCSSShow: false,
    commentData: [],
  },
  methods: {
    onLoad() {
      this.setData({
        value: DATA.value,
        key: DATA.key,
      })
    },
    icontap(e) {
      const { detail } = e
      const { lineStart } = detail

      const commentData = DATA.lineInfo[lineStart].comments
      this.setData({
        commentShow: true,
        commentCSSShow: true,
        commentData,
      })
    },
    closeCommentDialog() {
      this.setData({ commentCSSShow: false })

      setTimeout(() => {
        this.setData({ commentShow: false })
      }, 400)
    },
  },
})
