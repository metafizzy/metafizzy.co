var path = require('path');

var utils = {};

utils.getBasename = function( filepath ) {
  return path.basename( filepath, path.extname( filepath ) );
};

module.exports = utils;
