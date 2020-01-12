const { src, dest, watch, series } = require('gulp')
const ts = require('gulp-typescript')
const del = require('del')

const delPrevFile = () => del(['lib/**/*'])

const parseTs = () => src('src/*.ts')
  .pipe(ts())
  .pipe(dest('lib/'))

  
watch('src/*.ts', { delay: 1000 }, cb => {
  series(delPrevFile, parseTs)()
  cb()
})

module.exports.default = series(delPrevFile, parseTs)