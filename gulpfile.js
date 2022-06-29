const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const minify = require('gulp-minify');
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');

function html() {
  return src('src/**.html')
    .pipe(include({
      prefix: '@@'
    }))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest('dist'))
}

function scss() {
  return src('src/scss/core.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(concat('style.css'))
    .pipe(dest('dist/css'))
}

function css() {
  return src('src/css/*.css')
    .pipe(dest('dist/css'))
}

function js() {
  return src('src/js/*.js')
  .pipe(dest('dist/js'))
}

function imagePNG() {
  return src('src/img/*.png')
  .pipe(dest('dist/img'))
}

function imageJPG() {
  return src('src/img/*.jpg')
  .pipe(dest('dist/img'))
}

function imageSVG() {
  return src('src/img/**/*.svg')
      .pipe(svgmin({
        js2svg: {
          pretty: true
        }
      }))
      .pipe(cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: {xmlMode: true}
      }))
      .pipe(replace('&gt;', '>'))
      // build svg sprite
      .pipe(svgSprite({
        mode: {
          symbol: {
            sprite: "sprite.svg"
          }
        }
      }))
      .pipe(dest('dist/img'))
}

function clear() {
  return del('dist')
}

function serve() {
  sync.init({
    server: './dist'
  })

  watch('src/**.html', series(html)).on('change', sync.reload)
  watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
  watch('src/scss/blocks/**.scss', series(scss)).on('change', sync.reload)
  watch('src/css/**.css', series(css)).on('change', sync.reload)
  watch('src/js/**.js', series(js)).on('change', sync.reload)
  watch('src/img/*.png', series(imagePNG)).on('change', sync.reload)
  watch('src/img/*.jpg', series(imageJPG)).on('change', sync.reload)
  watch('src/img/**/*.svg', series(imageSVG)).on('change', sync.reload)
}

exports.build = series(clear, scss, css, js, imagePNG, imageJPG, imageSVG, html)
exports.serve = series(clear, scss, css, js, imagePNG, imageJPG, imageSVG, html, serve)
exports.clear = clear