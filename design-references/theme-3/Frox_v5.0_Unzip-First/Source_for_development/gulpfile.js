const { src, dest, parallel, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const pug = require('gulp-pug')
const autoprefixer = require('gulp-autoprefixer')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const cssnano = require('cssnano')
const terser = require('gulp-terser')
const browsersync = require('browser-sync').create()

// Sass Task
function sassTask() {
  return src('src/assets/styles/sass/*.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(postcss([cssnano()]))
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(dest('dist/assets/styles', { sourcemaps: '.' }))
}

// TailwindCSS
function tailwindCSS() {
  return src('src/assets/styles/css/tailwind.css')
    .pipe(postcss([cssnano()]))
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(dest('dist/assets/styles'))
}

// Pug Task
function pugTask() {
  return src('src/views/*.pug')
    .pipe(pug({ pretty: true, doctype: 'HTML' }))
    .pipe(dest('dist'))
}

// Images

function images() {
  return src(['src/assets/images/*.+(png|jpeg|jpg|gif|svg)', 'src/assets/images/*/*.+(png|jpeg|jpg|gif|svg)']).pipe(
    dest('dist/assets/images')
  )
}

// JavaScript Task
function jsTask() {
  return src(['src/assets/scripts/*.js', 'src/assets/scripts/**/*.js'], {
    sourcemaps: true,
  })
    .pipe(terser())
    .pipe(dest('dist/assets/scripts', { sourcemaps: '.' }))
}

// Browsersync Tasks
function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: 'dist',
    },
  })
  cb()
}

function browsersyncReload(cb) {
  browsersync.reload()
  cb()
}

// Watch Task
function watchTask() {
  watch('dist/*.html', browsersyncReload)
  watch(
    [
      'src/sass/**/*.scss',
      'dist/css/tailwind.css',
      'src/views/**/*.pug',
      'src/assets/images/*.+(png|jpeg|jpg|gif|svg)',
      'src/assets/images/*/*.+(png|jpeg|jpg|gif|svg)',
      'src/js/**/*.js',
    ],
    series(sassTask, tailwindCSS, images, pugTask, jsTask, browsersyncReload)
  )
}

// Default Gulp task
exports.default = series(sassTask, tailwindCSS, images, pugTask, jsTask, browsersyncServe, watchTask)
exports.serve = series(browsersyncServe, watchTask, parallel(sassTask, tailwindCSS, images, pugTask, jsTask))
