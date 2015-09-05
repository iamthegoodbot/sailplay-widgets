'use strict';


var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    pagespeed = require('psi'),
    base64 = require('gulp-css-inline-images'),
    clean = require('gulp-clean'),
    uglifycss = require('gulp-uglifycss'),
    reload = browserSync.reload,
    $ = require('gulp-load-plugins')();             // load plugins

var options = {
    data: 'app/layout/data/*.{json,yml}',
    layouts: 'app/layout/',
    partials: 'app/includes/*.hbs'
};

gulp.task('styles', function () {

  return gulp.src('app/styles/*.less')
      .pipe($.less())
      .on('error', console.error.bind(console))
      .pipe(gulp.dest('app/styles'))
      .pipe($.size());
});

gulp.task('assemble', function () {
    gulp.src('app/pages/*.hbs')
        .pipe($.assemble(options))
        .pipe(gulp.dest('app/'));
});


gulp.task('serve', ['styles', 'assemble'], function () {
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    server: ['app']
  });

  gulp.watch('app/**/*.hbs', ['assemble']);
  gulp.watch('app/styles/**/*.{less, css}', ['styles', reload]);
  gulp.watch('app/js/**/*.js', reload);
  gulp.watch('app/img/**/*', reload);
  gulp.watch('app/*.html', reload);
});

gulp.task('pp', ['styles', 'assemble'], function () {
    browserSync({
        notify: false,
        logPrefix: 'WSK',
        server: ['app']
    });

    gulp.watch('app/styles/**/*.{less, css}', ['styles']);
    gulp.watch('app/**/*.hbs', ['assemble']);
});

gulp.task('build', ['styles', 'assemble'], function () {
    gulp.src('dist/', {read: false})
        .pipe(clean());

    gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));

    gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'));

    gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist/img'));

    gulp.src('app/styles/*.css')
        .pipe(base64({
            webRoot: 'app',
            path: '/img'
        }))
        .pipe(uglifycss({
            "max-line-len": 80
        }))
        .on('error', console.error.bind(console))
        .pipe(gulp.dest('dist/styles'));


    return gulp.src('app/plugins/**/*')
                .pipe(gulp.dest('dist/plugins'));
});

gulp.task('default', function () {
  gulp.start('serve');
});

gulp.task('pagespeed', pagespeed.bind(null, {
  url: 'https://example.com',
  strategy: 'mobile'
}));


