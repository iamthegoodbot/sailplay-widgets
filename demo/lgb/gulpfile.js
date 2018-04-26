/**
 * Created by awesome on 09.01.16.
 */
var gulp = require('gulp'),
  less = require('gulp-less'),
  filter = require('gulp-filter'),
  connect = require('gulp-connect'),
  uglify = require('gulp-uglifyjs'),
  ngAnnotate = require('gulp-ng-annotate'),
  del = require('del'),
  concat = require('gulp-concat'),
  series = require('stream-series'),
  LessPluginCleanCSS = require('less-plugin-clean-css'),
  LessPluginAutoPrefix = require('less-plugin-autoprefix'),
  cleancss = new LessPluginCleanCSS({advanced: true}),
  autoprefix = new LessPluginAutoPrefix({browsers: ["last 2 versions"]});

gulp.task('connect', function () {
  return connect.server({
    root: './dist/',
    livereload: true
  });
});
gulp.task('clean', function () {
  return del('./dist').pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./src/*.html'], ['html']);
  gulp.watch(['./src/js/**/*'], ['js:dev']);
  gulp.watch(['./src/less/**/**/*'], ['css']);
});

gulp.task('css', function () {
  return gulp.src('./src/less/main.less')
    .pipe(less({
      plugins: [autoprefix, cleancss]
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload());
});

gulp.task('html', function () {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
});

gulp.task('img', function () {
  return gulp.src('./src/image/*')
    .pipe(gulp.dest('./dist/image'))
    .pipe(connect.reload());
});

gulp.task('transfer', function () {
  return gulp.src('./src/js/libs/transfer/*')
    .pipe(gulp.dest('./dist/js/'))
    .pipe(connect.reload());
});

gulp.task('js:prod', function () {
  return series(
    gulp.src('./src/js/libs/important/*'),
    gulp.src('./src/js/libs/!(core)*'),
    gulp.src('./src/js/libs/core/*.js'),
    gulp.src('./src/js/tools/*'),
    gulp.src('./src/js/services/*'),
    gulp.src('./src/js/components/*'),
    gulp.src('./src/js/app.js'))
    .pipe(concat('main.min.js'))
    .pipe(ngAnnotate({
      add: true
    }))
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js"))
    .pipe(connect.reload());
});

gulp.task('fonts', function () {
  return gulp.src('./src/fonts/*')
    .pipe(gulp.dest('./dist/fonts'))
    .pipe(connect.reload());
});

gulp.task('js:dev', function () {
  return series(
    gulp.src('./src/js/libs/important/*'),
    gulp.src('./src/js/libs/!(core)*'),
    gulp.src('./src/js/libs/core/*.js'),
    gulp.src('./src/js/tools/*'),
    gulp.src('./src/js/services/*'),
    gulp.src('./src/js/components/*'),
    gulp.src('./src/js/app.js'))
    .pipe(concat('main.min.js'))
    .pipe(ngAnnotate({
      add: true
    }))
    .pipe(gulp.dest("./dist/js"))
    .pipe(connect.reload());
});

gulp.task('prod', ['connect', 'watch', 'css', 'html', 'fonts', 'img', 'transfer', 'js:prod']);

gulp.task('default', ['connect', 'watch', 'css', 'html', 'fonts', 'img', 'transfer', 'js:dev']);