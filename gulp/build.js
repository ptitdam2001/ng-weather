"use strict";

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');


var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var angularFilesort = require('gulp-angular-filesort');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var directiveReplace = require('gulp-directive-replace');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');

gulp.task('build:js', function() {
    gulp.src([path.join(conf.paths.app, '/src/*.js')])
        .pipe(angularFilesort())
        .pipe(concat('ptitdam-ng-openweathermap.js')) //concat des fichiers
        .pipe(directiveReplace()) //incrustation des templates
        .pipe(sourcemaps.init())
        .pipe(ngAnnotate({
            add: true
        }))
        .pipe(gulp.dest(conf.paths.dist))   //sauvegarde dans dist
        //minification
        .pipe(uglify())
        .pipe(rename('ptitdam-ng-openweathermap.min.js'))
        .pipe(gulp.dest(conf.paths.dist))
        .pipe(sourcemaps.write('./')) //source map
        .pipe(gulp.dest(conf.paths.dist))
    ;
});

gulp.task('build:css', function() {
    gulp.src([path.join(conf.paths.app, 'less/main.less')])
        .pipe(less({
            paths: [__dirname, path.join(__dirname, 'weather-icons')]
        }))
        .pipe(rename('ptitdam-ng-openweathermap.css'))
        .pipe(gulp.dest(conf.paths.dist));

    gulp.src(path.join(conf.paths.dist,'/*.css'))
        .pipe(sourcemaps.init())
        .pipe(minifyCss())
        .pipe(rename('ptitdam-ng-openweathermap.min.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(conf.paths.dist));
});

gulp.task('build:assets', function() {
    gulp.src([path.join(conf.paths.app, '/assets/**/*.*')])
        .pipe(gulp.dest(path.join(conf.paths.dist, '/assets')));
});