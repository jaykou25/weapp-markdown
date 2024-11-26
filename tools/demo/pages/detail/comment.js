Component({
  properties: {
    node: {
      type: Object,
      value: {},
    },
  },
  data: {},
  methods: {
    commentTap(e) {
      const { dataset } = e.currentTarget
      this.triggerEvent('commentIconTap', dataset, {
        bubbles: true,
        composed: true,
      })
    },
  },
})
