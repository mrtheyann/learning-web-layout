gulp = require 'gulp'
jade = require 'gulp-jade'


gulp.task 'jade', ->
  gulp.src 'jade/*.jade'
    .pipe do jade
    .pipe gulp.dest 'dist'

gulp.task 'default', ['jade']
