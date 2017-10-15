var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('sass', function() {
  gulp.src('./dev/css/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./dev/css/**/*.sass', ['sass'])
});
