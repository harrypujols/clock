var gulp        = require('gulp'),
    electron    = require('gulp-electron'),
    packageJson = require('./app/package.json'),
    sass        = require('gulp-sass'),
    browsersync = require('browser-sync');

// --- electron ---
gulp.task('release', function() {
    gulp.src('')
    .pipe(electron({
        src: './app',
        packageJson: packageJson,
        release: './release',
        cache: './cache',
        version: 'v0.37.4',
        packaging: true,
        platforms: ['win32-ia32', 'darwin-x64'],
        platformResources: {
            darwin: {
                CFBundleDisplayName: packageJson.name,
                CFBundleIdentifier: packageJson.name,
                CFBundleName: packageJson.name,
                CFBundleVersion: packageJson.version,
                icon: './icons/icon.icns'
            },
            win: {
                "version-string": packageJson.version,
                "file-version": packageJson.version,
                "product-version": packageJson.version
            }
        }
    }))
    .pipe(gulp.dest(''));
});

// --- sass ---
gulp.task('sass', function () {
  return gulp.src('./app/sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./app/css'));
});

// --- watch ---
gulp.task('sass:watch', function () {
  gulp.watch('./app/sass/**/*.scss', ['sass']);
});

// --- sync ---
gulp.task('sync', function() {
    browsersync.init(['./app/*', './app/**/*'], {
        server: {
            baseDir: './app'
        }
    });
});

// --- Default task ---
gulp.task('default', ['sync', 'sass', 'sass:watch']);
