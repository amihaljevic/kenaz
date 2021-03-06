var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var browsersync = require('browser-sync').create();
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var neat = require('node-neat');
var handlebars = require('handlebars');

gulp.task('scss', function() {
    return gulp.src('src/scss/base.scss')
    .pipe(sass.sync({ includePaths: neat.includePaths }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 100 versions'],
        grid: true
    }))
    //.pipe(rename('style.css'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('bs-reload-scss', ['scss'], function(done) {
    browsersync.reload();
    done();
});

gulp.task('js', function() {
    return gulp.src(['src/js/truncateText.js', 'src/js/**'])
    .pipe(concat('script.bundle.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('bs-reload-js', ['js'], function(done) {
    browsersync.reload();
    done();
});

gulp.task('img', function() {
    return gulp.src('src/img/**')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img/'));
});

gulp.task('bs-reload-img', ['img'], function(done) {
    browsersync.reload();
    done();
});

gulp.task('icon', function() {
    return gulp.src('src/icons/**')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/icons/'));
});

gulp.task('bs-reload-icon', ['icon'], function(done) {
    browsersync.reload();
    done();
});

gulp.task('bs', function() {
    browsersync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("src/scss/**", ['bs-reload-scss']);
    gulp.watch("src/js/**", ['bs-reload-js']);
    gulp.watch("src/img/**", ['bs-reload-img']);
    gulp.watch("src/icons/**", ['bs-reload-icon']);
    gulp.watch("**.html").on("change", browsersync.reload);
});

gulp.task('default', ['scss', 'js', 'img', 'icon']);
gulp.task('serve', ['scss', 'js', 'img', 'icon', 'bs']);