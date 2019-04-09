const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

gulp.task('compress', function() {
  return gulp.src(['./index.js'])
    .pipe(uglify())
    .pipe(rename('event-randomizer.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy', function() {
  return gulp.src(['./index.js'])
    .pipe(rename('event-randomizer.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('license', function() {
  return gulp.src(['./LICENSE'])
    .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('compress', 'copy', 'license'));
