var gutil = require('gulp-util');

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
    app: 'app',
    src: 'app/src',
    dist: 'dist',
    tmp: '.tmp',
    example: 'example'
};

exports.wiredep = {
    exclude: [],
    directory: 'bower_components',
    devDependencies: true
};


/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
    'use strict';

    return function(err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};