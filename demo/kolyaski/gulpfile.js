(function(){

  'use strict';

  var gulp = require('gulp');
  var concat = require('gulp-concat');
  var less = require('gulp-less');
  var path = require('path');
  var browserSync = require('browser-sync').create();
  var css2js = require('gulp-css2js');

  gulp.task('connect', function () {

    browserSync.init({
      server: "./",
      host: '0.0.0.0',
      open: false
    });

  });

  gulp.task('watch', function(){
    gulp.watch(__dirname + '/src/js/**/*.js', ['build.javascript']);
    gulp.watch(__dirname + '/src/html/**/*.html', ['build.javascript']);
    gulp.watch(__dirname + '/src/less/**/*.less', ['build.less']);
    gulp.watch(__dirname + '/src/font/**/*', ['build.fonts']);
    gulp.watch(__dirname + '/src/img/**/*', ['build.img']);
  });

  gulp.task('build.javascript', [ 'javascript.concat' ]);

  gulp.task('javascript.concat',['convert.less'], function() {
    return gulp.src([
      __dirname + '/node_modules/sailplay-hub/sailplay.hub.js',
      __dirname + '/node_modules/sailplay-hub-leads/sailplay.hub.leads.js',
      __dirname + '/dist/css/sailplay.kolyaski.js',
      __dirname + '/src/js/**/*.js'
    ])
      .pipe(concat('sailplay.kolyaski.js'))
      .pipe(gulp.dest(__dirname + '/dist/js/'));
  });

  gulp.task('build.less', [ 'concat.less' ], function () {
    return gulp.src([__dirname + '/dist/css/sailplay.kolyaski.css'])
      .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
      }))
      .pipe(gulp.dest(__dirname + '/dist/css'));
  });

  gulp.task('concat.less', function () {
    return gulp.src([__dirname + '/src/less/*.less'])
      .pipe(concat('sailplay.kolyaski.css'))
      .pipe(gulp.dest(__dirname + '/dist/css'));
  });

  gulp.task('convert.less', [ 'build.less' ], function(){
    return gulp.src(__dirname + '/dist/css/sailplay.kolyaski.css')
      .pipe(css2js())
      .pipe(gulp.dest("./dist/css/"));
  });

  gulp.task('build.fonts', function () {
    return gulp.src(__dirname + '/src/font/**/*')
      .pipe(gulp.dest(__dirname + '/dist/font'));
  });

  gulp.task('build.img', function () {
    return gulp.src(__dirname + '/src/img/**/*')
      .pipe(gulp.dest(__dirname + '/dist/img'));
  });

  gulp.task('default', ['connect', 'watch', 'build.javascript', 'build.less', 'build.fonts', 'build.img']);

  gulp.task('build', ['build.javascript', 'build.less']);

}());