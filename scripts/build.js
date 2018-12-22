const rollup = require('rollup')
    , commonJs = require('rollup-plugin-commonjs')
    , nodeResolve = require('rollup-plugin-node-resolve')
    , filesize = require('rollup-plugin-filesize')
    , replace = require('rollup-plugin-replace')
    , terser = require('rollup-plugin-terser').terser
    , buble = require('rollup-plugin-buble')
    , fs = require('fs-extra')
    , path = require('path')

const tmp = '_dist'
    , target = 'dist'

fs.removeSync(tmp)
fs.ensureDirSync(tmp)
fs.copySync('assets', tmp)

rollup.rollup({
  input: 'src/index.js',
  plugins: [
    commonJs(),
    nodeResolve(),
    buble(),
    replace({
      'window.m = m': '',
      'b.setDebug(true)': ''
    }),
    terser({ mangle: true, compress: true }),
    filesize()
  ]
})
.then(bundle =>
  bundle.write({
    file: path.join(tmp, '/app.js'),
    format: 'iife',
    sourcemap: true
  })
)
.then(() =>
  fs.moveSync(tmp, target, { overwrite: true })
)
.catch(console.error)
