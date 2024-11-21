const esbuild = require('esbuild')

esbuild
  .build({
    entryPoints: ['src/parse.js'],
    outdir: 'testBundle',
    bundle: true,
    format: 'cjs',
    define: {
      'process.env.NODE_ENV': '"test"',
    },
    // 其他配置选项...
  })
  .catch(() => process.exit(1))
