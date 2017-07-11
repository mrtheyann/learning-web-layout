var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
});

gulp.task('sass', function() {
  gulp.src('./dev/css/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./dev/css/**/*.sass', ['sass'])
});

//gulp.task('default', ['connect', 'watch'])
