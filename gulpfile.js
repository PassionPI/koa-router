const { src, dest, watch, series, parallel } = require('gulp')
const ts = require('gulp-typescript')
const del = require('del')

function delPrevFile(cb) {
  return del(['dist/**/*'])
}

function parseTs() {
  return src('src/*.ts')
    .pipe(ts())
    .pipe(dest('dist/'))
}

watch('src/*.ts', { delay: 1000 }, cb => cb())

module.exports.default = series(delPrevFile, parseTs)