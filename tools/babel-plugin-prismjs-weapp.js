let i = 0

module.exports = function ({ types, template }) {
  console.log('babel-plugin-prisms-weapp start')
  const findPrism = {
    // Identifier(path) {
    //   if (path.node.name === 'Prism') {
    //     console.log('node', path.node)
    //   }
    // },
    CallExpression(path) {
      console.log('callexpress', path.node)
    },
  }

  return {
    name: 'babel-plugin-prismjs-weapp',
    visitor: {
      // visitor contents
      // ImportDeclaration(path) {
      //   if (/prismjs\/components\//.test(path.node.source.value)) {
      //     console.log('ImportDeclaration+++++++')
      //     path.traverse(findPrism)
      //   }
      // },
      CallExpression(path) {
        const args = path.node.arguments

        args.forEach((arg) => {
          if (arg.name === 'Prims') {
            // console.log('arg', arg.name)
          }
        })

        i++
      },
      // Identifier(path) {
      //   if (path.node.name === 'Prism') {
      //     console.log('node', path.node)
      //   }
      // },
      ExpressionStatement(path) {
        // console.log('express', path.node.expression.arguments)
      },
    },
  }
}
