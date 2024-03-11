var fs = require('fs')
var path = require('path')

/**
 * 这是一个 webpack loader, 用于更改 prismjs 中语言包的变量名
 *
 * 起因: prismjs 中的语言包会用到一个全局变量 Prism
 * 以 prism-bash.js 这个语言包为例, 它是一个立即执行函数
 * (function(Prism){})(Prism)
 *
 * 因为小程序的逻辑执行上下文是 node 环境, 直接读 Prism 会报错, 需要加上 global.Prism(这一点很奇怪)
 * 所以写了这个 loader 来给 Prism 变量前加上 global.
 *
 */
module.exports = function (content) {
  if (/prismjs/.test(this.resourcePath)) {
    /** prism-core 这个包除外 */
    if (!/prism-core/.test(this.resourcePath)) {
      let _content

      /** 如果是立即执行函数 */
      if (/\}\(Prism\)/.test(content)) {
        _content = content.replace(/\}\(Prism\)/g, '}(global.Prism)')
      } else {
        _content = content.replace(/Prism\./g, 'global.Prism.')
      }

      /** 可以输出内容到文件 */
      const basename = path.basename(this.resourcePath)
      const p = path.join(__dirname, 'logs', `${basename}.txt`)
      fs.writeFile(p, _content, (err) => {
        if (err) throw err
      })

      return _content
    }
  }

  return content
}
