/* jshint node: true, strict: false */

var gulp = require('gulp');
// var rename = require('gulp-rename');
// var through = require('through2');

require('./tasks/content');

// -------------------------- serve -------------------------- //

var serve = require('gulp-serve');

gulp.task( 'serve', serve('build') );

// -------------------------- utils -------------------------- //

var glob = require('glob');

/**
 * getGlobPaths
 * takes glob src and returns expanded paths
 * @param {Array} src
 * @returns {Array} paths
 */
function getGlobPaths( src ) {
  var paths = [];
  // replace all glob paths with expanded paths
  src.forEach( function( filepath ) {
    if ( glob.hasMagic( filepath ) ) {
      var files = glob.sync( filepath );
      // replace glob with paths
      paths = paths.concat( files );
    } else {
      paths.push( filepath );
    }
  });
  return paths;
}
