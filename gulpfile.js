/* jshint node: true, strict: false */

var gulp = require('gulp');
var rename = require('gulp-rename');
var through = require('through2');

// -------------------------- content/template -------------------------- //

var Handlebars = require('handlebars');
// var path = require('path');

function template( data ) {
  // defaults
  data = data || {};

  return through.obj( function( file, encoding, callback ) {
    var fileContents = file.contents.toString();
    var tmpl = Handlebars.compile( fileContents );
    file.contents = new Buffer( tmpl( data ) );
    return callback( null, file );
  });
}

gulp.task( 'content-homepage', function() {
  return gulp.src('pages/homepage.mustache')
    .pipe( template() )
    .pipe( rename('index.html') )
    .pipe( gulp.dest('build') );
});

gulp.task( 'content', [
  'content-homepage'
]);

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
