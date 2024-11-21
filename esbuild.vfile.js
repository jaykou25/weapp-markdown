const esbuild = require('esbuild')

esbuild
  .build({
    entryPoints: ['src/vfile.js'],
    outfile: 'src/vfile-bundle.js',
    bundle: true,
    format: 'cjs',
    define: {
      'process.env.NODE_ENV': '"test"',
    },
    // 其他配置选项...
  })
  .catch(() => process.exit(1))
