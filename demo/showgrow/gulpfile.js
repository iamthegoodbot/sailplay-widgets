(function(){

  'use strict';

  var gulp = require('gulp');
  var concat = require('gulp-concat');
  var ngAnnotate = require('gulp-ng-annotate');
  var less = require('gulp-less');
  var streamqueue = require('streamqueue');
  var path = require('path');
  var connect = require('gulp-connect');


  gulp.task('watch', function(){
    gulp.watch(__dirname + '/src/js/**/*.js', ['build.javascript']);
    gulp.watch(__dirname + '/src/less/**/*.less', ['build.less']);
    gulp.watch(__dirname + '/src/fonts/**/*', ['build.fonts']);
    gulp.watch(__dirname + '/src/image/**/*', ['build.img']);
  });

  gulp.task('build.javascript', [ 'javascript.concat', 'javascript.ngAnnotate' ]);

  gulp.task('javascript.concat', function() {
    return gulp.src([
      __dirname + '/node_modules/jquery/dist/jquery.min.js',
      __dirname + '/node_modules/sailplay-hub/sailplay.hub.js',
      __dirname + '/node_modules/sailplay-hub-actions/sailplay.hub.actions.js',
      __dirname + '/node_modules/angular/angular.min.js',
      __dirname + '/src/js/**/**/*.js'
    ]).pipe(concat('sg.sailplay.js'))
      .pipe(gulp.dest(__dirname + '/dist/'));
  });

  gulp.task('javascript.ngAnnotate',[ 'javascript.concat' ], function () {
    return gulp.src(__dirname + '/dist/sg.sailplay.js')
      .pipe(ngAnnotate({
        add: true
      }))
      .pipe(gulp.dest(__dirname + '/dist/'));
  });

  gulp.task('build.less', function () {
    return gulp.src(__dirname + '/src/less/sg.sailplay.less')
      .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
      }))
      .pipe(gulp.dest(__dirname + '/dist/'));
  });

  gulp.task('build.fonts', function () {
    return gulp.src(__dirname + '/src/fonts/**/*')
      .pipe(gulp.dest(__dirname + '/dist/fonts'));
  });

  gulp.task('build.img', function () {
    return gulp.src(__dirname + '/src/image/**/*')
      .pipe(gulp.dest(__dirname + '/dist/image'));
  });

  gulp.task('connect', function() {
    connect.server({
      root: './',
      port: 8888,
      livereload: true
    });
  });


  gulp.task('default', ['connect', 'watch', 'build.javascript', 'build.less', 'build.fonts', 'build.img']);

  gulp.task('build', ['build.javascript', 'build.less', 'build.fonts', 'build.img']);

}());