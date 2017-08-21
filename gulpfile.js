var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var browsersync = require('browser-sync').create();
var watch = require('gulp-watch');

gulp.task('css', function() {
    return gulp.src('src/css/**')
    .pipe(autoprefixer({
        browsers: ['last 100 versions'],
        grid: true
    }))
    .pipe(concat('style.bundle.css'))
    .pipe(gulp.dest('dist/'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('bs-reload-css', ['css'], function(done) {
    browsersync.reload();
    done();
});

gulp.task('js', function() {
    return gulp.src('src/js/**')
    .pipe(concat('script.bundle.js'))
    .pipe(gulp.dest('dist/'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('bs-reload-js', ['js'], function(done) {
    browsersync.reload();
    done();
});

gulp.task('img', function() {
    return gulp.src('src/img/**')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/'));
});

gulp.task('bs-reload-img', ['img'], function(done) {
    browsersync.reload();
    done();
});

gulp.task('bs', function() {
    browsersync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("src/css/**", ['bs-reload-css']);
    gulp.watch("src/js/**", ['bs-reload-js']);
    gulp.watch("src/img/**", ['bs-reload-img']);
    gulp.watch("index.html").on("change", browsersync.reload);
});

gulp.task('default', ['css', 'js', 'img']);
gulp.task('serve', ['css', 'js', 'img', 'bs']);