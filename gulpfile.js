'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const fractal = require('./fractal');
const concat = require('gulp-concat');
const minify = require('gulp-minify');

const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

gulp.task('build', function(){
    gulp.start('sass');
    gulp.start('scripts');
    gulp.watch(['./components/**/*.scss', './assets/scss/app.scss'], ['sass']);
    gulp.watch('./components/**/*.js', ['scripts']);
    const server = fractal.web.server({
        sync: true
    });
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.url}`);
    });
});

gulp.task('fractal:build', function(){
    const builder = fractal.web.builder();
    builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
    builder.on('error', err => logger.error(err.message));
    return builder.build().then(() => {
        logger.success('Fractal build completed!');
    });
});

gulp.task('scripts', function () {
    return gulp.src('./components/**/*.js')
        .pipe(concat('app.js'))
        .pipe(minify())
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('sass', function () {
    // return gulp.src('./components/**/*.scss')
    return gulp.src('./assets/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./public/css/'));
});
