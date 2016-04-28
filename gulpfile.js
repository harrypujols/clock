var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browsersync = require('browser-sync');

// --- sass ---
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./css'));
});

// --- watch ---
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

// --- sync ---
gulp.task('sync', function() {
    browsersync.init(['./*', './**/*'], {
        server: {
            baseDir: './'
        }
    });
});

// --- Default task ---
gulp.task('default', ['sync', 'sass', 'sass:watch']);
