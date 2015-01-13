/* jshint node:true */
'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    wrap = require('gulp-wrap'),
    del = require('del');

// hint
gulp.task('jshint', function() {
    gulp.src(['src/qr-links.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src(['src/qrcode.js', 'src/qr-links.js'])
        .pipe(concat('main.js'))
        .pipe(wrap('(function () {<%= contents %>}());'))
        .pipe(gulp.dest('dist'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
        /*jshint scripturl:true */
        .pipe(wrap('javascript:<%= contents %>'))
        .pipe(rename({
            basename: 'bookmark'
        }))
        .pipe(gulp.dest('dist'))
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});

// Clean
gulp.task('clean', function(cb) {
    del(['dist'], cb);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('jshint', 'scripts');
});
