Component({
  options: {
    virtualHost: false,
  },
  properties: {
    node: {
      type: Object,
      value: {},
    },
    isBlockCode: {
      type: Boolean,
      value: false,
    },
  },

  lifetimes: {
    created: function () {
      // console.log('treenode created: ', this.node)
    },
    attached: function () {
      // console.log('treenode attached', this.node)
    },
  },
  methods: {
    handleLink(e) {
      const { dataset } = e.currentTarget
      this.triggerEvent('linkClick', dataset, {
        bubbles: true,
        composed: true,
      })
    },
    handlePlay(e) {
      const { data } = e.detail

      this.triggerEvent('play', data, {
        bubbles: true,
        composed: true,
      })
    },
    listenImgPreview(e) {
      this.triggerEvent('imgPreview', e.currentTarget.dataset, {
        bubbles: true,
        composed: true,
      })
    },
  },
})
