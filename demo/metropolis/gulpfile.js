(function () {

  'use strict';
  var gulp = require('gulp');
  var concat = require('gulp-concat');
  //var less = require('gulp-less');
  //var path = require('path');

  gulp.task('build.javascript', function() {
    return gulp.src([ '../../hub/src/sailplay.hub.js', '../../hub/src/sailplay.hub.leads.js' ])
      .pipe(concat('sailplay.metropolis.leads.min.js'))
      .pipe(gulp.dest('./dist/'));
  });

  //gulp.task('farm.ngAnnotate',[ 'farm.concat' ], function () {
  //  return gulp.src(__dirname + '/public/js/dist/getdoctor.js')
  //    .pipe(ngAnnotate({
  //      add: true
  //    }))
  //    .pipe(gulp.dest(__dirname + '/public/js/dist/'));
  //});

  //gulp.task('farm.less.app', function () {
  //  return gulp.src(__dirname + '/public/css/app/getdoctor.less')
  //    .pipe(less({
  //      paths: [ path.join(__dirname, 'less', 'includes') ]
  //    }))
  //    .pipe(gulp.dest(__dirname + '/public/css/app/'));
  //});

  //gulp.task('farm.less.lib', [ 'farm.less.app' ], function () {
  //  return gulp.src(__dirname + '/public/css/lib/skin/default_skin/less/theme.less')
  //    .pipe(less({
  //      paths: [ path.join(__dirname, 'less', 'includes') ]
  //    }))
  //    .pipe(gulp.dest(__dirname + '/public/css/lib/skin/'));
  //});
  //
  //
  //gulp.task('farm.build.javascript', ['farm.concat', 'farm.ngAnnotate']);
  //gulp.task('farm.build.less', ['farm.less.app', 'farm.less.lib']);
  //
  gulp.task('build', ['build.javascript']);

  gulp.task('dev', ['build'], function () {

    gulp.watch('../../hub/src/**/*.js', ['build.javascript']);
    //gulp.watch(__dirname + '/public/css/**/*.less', ['farm.build.less']).on('change', browserSync.reload);
    gulp.watch(__dirname + "/**/*.html");

  });

}());
