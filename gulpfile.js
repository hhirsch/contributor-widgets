var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var paths = {
    pages: ['source/*.html']
};

gulp.task('copyDist', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('dist'));
});

gulp.task('compile', function () {
  return browserify({
    basedir: '.',
    debug: true,
    entries: ['source/Main.ts'],
    cache: {},
    packageCache: {}
  })
    .plugin(tsify)
    .transform('babelify', {
      presets: ['es2015'],
      extensions: ['.ts']
    })
    .bundle()
    .on('error', function (error) { console.error(error.toString()); })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', function() {
  gulp.watch('source/*.ts',  function() {
     gulp.run('compile');
     gulp.run('copyDist');
  });
  gulp.watch('source/*.html',  function() {
    gulp.run('copyDist');
  });
});
