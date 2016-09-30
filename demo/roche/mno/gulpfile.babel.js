import gulp from 'gulp';
import rimraf from 'rimraf';
import run from 'run-sequence';
import concat from 'gulp-concat';
import server from 'gulp-connect';
import watch from 'gulp-watch';
import uglify from 'gulp-uglify';
import ng_annotate from 'gulp-ng-annotate';
import less from 'gulp-less';

const paths = {
  src: './src/**/*',
  dist: './dist',
  less: {
    src: [ './src/less/**/*.less' ],
    dist: './dist/css',
    file_name: 'sailplay.leads.roche.css'
  },
  js: {
    src: [ './src/js/**/*.js' ],
    dist: './dist/js',
    file_name: 'sailplay.leads.roche.min.js'
  }
};

gulp.task('default', (callback) => {
  run("build", "server", "watch", callback);
});

gulp.task('dev', (callback) => {
  run("build", "watch", callback);
});

gulp.task('build', (callback) => {
  run('clean', 'concat', 'vendor', 'less', callback);
});

gulp.task('clean', (callback) => {
  rimraf(paths.dist, callback);
});

gulp.task('concat', (callback) => {
  return gulp.src(paths.js.src)
    .pipe(concat(paths.js.file_name))
    .pipe(ng_annotate({
      add: true
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dist));
});

gulp.task('vendor', (callback) => {
  return gulp.src([
    './node_modules/angular/angular.min.js',
    './node_modules/angular-ui-mask/dist/mask.min.js',
    paths.js.dist + '/' + paths.js.file_name
  ])
    .pipe(concat(paths.js.file_name))
    .pipe(gulp.dest(paths.js.dist))
});

gulp.task('watch', () => {
  return watch([ paths.src ], () => {
    gulp.start('build');
  })
});

gulp.task('less', () => {
  return gulp.src(paths.less.src)
    .pipe(less())
    .pipe(concat(paths.less.file_name))
    .pipe(gulp.dest(paths.less.dist));
});

gulp.task('server', () => {
  server.server({
    port: 3000
  });
});
