"use strict";

var gulp = require('gulp');

var wrench = require('wrench');

//Implement Gulp files and tasks
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});


gulp.task('default', ['build:js', 'build:css', 'build:assets']);