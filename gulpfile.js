/* jshint node: true, strict: false */

var gulp = require('gulp');
// var rename = require('gulp-rename');
// var through = require('through2');


// ----- assets ----- //

// copy assets to build
gulp.task( 'assets', function() {
  return gulp.src('assets/**/*.*')
    .pipe( gulp.dest('build') );
});

// ----- serve ----- //

var serve = require('gulp-serve');

gulp.task( 'serve', serve('build') );

// ----- content ----- //

require('./tasks/content');

// ----- default ----- //

gulp.task( 'default', [
  'assets',
  'copy-css',
  'content'
]);
