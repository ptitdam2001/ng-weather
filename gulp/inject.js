'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');


gulp.task('inject', function () {
    var injectStyles = gulp.src([
        path.join(conf.paths.tmp, '/serve/app/**/*.css')
    ], { read: false });

    var injectScripts = gulp.src([
        path.join(conf.paths.src, '/*.module.js'),
        path.join(conf.paths.src, '/*.provider.js'),
        path.join(conf.paths.src, '/*.run.js'),
        path.join(conf.paths.src, '/**/*.js'),
        path.join('!' + conf.paths.src, '/**/*.spec.js'),
        path.join('!' + conf.paths.src, '/**/*.mock.js')
    ])
    .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

    var injectDemo = gulp.src([
        path.join(conf.paths.example, '/**/*.js')
    ]).pipe($.angularFilesort());

    var injectOptions = {
        ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
        addRootSlash: false
    };

    return gulp.src('./index.html')
        .pipe($.inject(injectStyles, injectOptions))
        .pipe(wiredep(_.extend({}, conf.wiredep)))
        .pipe($.inject(injectScripts, injectOptions))
        .pipe($.inject(injectDemo, _.extend({}, injectOptions, {starttag: '<!-- inject:demo:{{ext}} -->'})))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});
