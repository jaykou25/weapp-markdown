Component({
  properties: {
    node: {
      type: Object,
      value: {},
    },
  },
  observers: {
    node: function (node) {
      console.log('my-block-extra', node)
    },
  },

  data: {},
})
