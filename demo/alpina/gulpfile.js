(function () {

  'use strict';

  var gulp = require('gulp');
  var concat = require('gulp-concat');
  var ngAnnotate = require('gulp-ng-annotate');
  var less = require('gulp-less');
  var path = require('path');
  var ngHtml2Js = require("gulp-ng-html2js");
  var minifyHtml = require("gulp-minify-html");
  var imagemin = require('gulp-imagemin');
  var browserSync = require('browser-sync').create();

  gulp.task('connect', function () {

    browserSync.init({
      server: "./",
      host: '0.0.0.0',
      open: false
    });

  });

  gulp.task('watch', function () {
    gulp.watch(__dirname + '/src/js/**/*.js', ['build.javascript']);
    gulp.watch(__dirname + '/src/html/**/*.html', ['build.javascript']);
    gulp.watch(__dirname + '/src/less/**/*.less', ['build.less']);
    gulp.watch(__dirname + '/src/font/**/*', ['build.fonts']);
    gulp.watch(__dirname + '/src/img/**/*', ['build.images']);
    gulp.watch(__dirname + '/src/json/**/*', ['build.json']);
  });

  gulp.task('build.javascript', ['javascript.concat', 'javascript.ngAnnotate']);

  gulp.task('javascript.concat', function () {
    return gulp.src([
      __dirname + '/node_modules/jquery/dist/jquery.min.js',
      __dirname + '/node_modules/sailplay-hub/sailplay.hub.js',
      __dirname + '/node_modules/sailplay-hub-actions/sailplay.hub.actions.js',
      __dirname + '/node_modules/angular/angular.min.js',
      __dirname + '/node_modules/angular-ui-mask/dist/mask.min.js',
      __dirname + '/node_modules/angular-touch/angular-touch.min.js',
      __dirname + '/node_modules/angular-cookie/angular-cookie.min.js',
      __dirname + '/node_modules/angular-utils-pagination/dirPagination.js',
      __dirname + '/src/js/**/**/*.js'
    ])
      .pipe(concat('sailplay.alpina.js'))
      .pipe(gulp.dest(__dirname + '/dist/js/'));
  });

  gulp.task('javascript.ngAnnotate', ['javascript.concat'], function () {
    return gulp.src(__dirname + '/dist/js/sailplay.alpina.js')
      .pipe(ngAnnotate({
        add: true
      }))
      .pipe(gulp.dest(__dirname + '/dist/js/'));
  });

  gulp.task('build.less', function () {
    return gulp.src(__dirname + '/src/less/sailplay.alpina.less')
      .pipe(less({
        paths: [path.join(__dirname, 'less', 'includes')]
      }))
      .pipe(gulp.dest(__dirname + '/dist/css/'));
  });

  gulp.task('build.fonts', function () {
    return gulp.src(__dirname + '/src/fonts/**/*')
      .pipe(gulp.dest(__dirname + '/dist/fonts'));
  });

  gulp.task('build.images', function () {
    return gulp.src(__dirname + '/src/image/**/*')
      .pipe(imagemin())
      .pipe(gulp.dest(__dirname + '/dist/image'));
  });


  gulp.task('default', ['connect', 'watch', 'build.javascript', 'build.less', 'build.images', 'build.fonts']);

  gulp.task('build', ['build.javascript', 'build.less', 'build.images', 'build.fonts']);

}());