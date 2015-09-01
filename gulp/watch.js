"use strict";

var gulp = require('gulp');
var conf = require('./conf');
var browserSync = require('browser-sync').create();


gulp.task('js-watch', browserSync.reload);

gulp.task('watch', function() {
    gulp.watch([conf.paths.src + '/*.js', conf.paths.src + '/**/*.js', conf.paths.example + '/**/*.js'], ['lint', 'build', 'js-watch']);
});