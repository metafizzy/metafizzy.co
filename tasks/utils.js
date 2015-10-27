var path = require('path');

var utils = {};

utils.getBasename = function( filepath ) {
  return path.basename( filepath, path.extname( filepath ) );
};

var glob = require('glob');

/**
 * getGlobPaths
 * takes glob src and returns expanded paths
 * @param {Array} src
 * @returns {Array} paths
 */
utils.getGlobPaths = function( src ) {
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
};

utils.extend = function( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
};

module.exports = utils;
