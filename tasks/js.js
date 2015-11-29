var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var utils = require('./utils');
var through = require('through2');

var jsSrcs = [
  'bower_components/get-style-property/get-style-property.js',
  'bower_components/get-size/get-size.js',
  'bower_components/matches-selector/matches-selector.js',
  'bower_components/eventEmitter/EventEmitter.js',
  'bower_components/eventie/eventie.js',
  'bower_components/doc-ready/doc-ready.js',
  'bower_components/classie/classie.js',
  'bower_components/fizzy-ui-utils/utils.js',
  // draggabilly
  'bower_components/unipointer/unipointer.js',
  'bower_components/unidragger/unidragger.js',
  'bower_components/draggabilly/draggabilly.js',
  // outlayer
  'bower_components/outlayer/item.js',
  'bower_components/outlayer/outlayer.js',
  // masonry
  'bower_components/masonry/masonry.js',
  // packery
  'bower_components/packery/js/rect.js',
  'bower_components/packery/js/packer.js',
  'bower_components/packery/js/item.js',
  'bower_components/packery/js/packery.js',
  // isotope
  'bower_components/isotope/js/layout-mode.js',
  'bower_components/isotope/js/item.js',
  'bower_components/isotope/js/isotope.js',
  'bower_components/isotope/js/layout-modes/fit-rows.js',
  // flickity deps
  'bower_components/tap-listener/tap-listener.js',
  // flickity
  'bower_components/flickity/js/cell.js',
  'bower_components/flickity/js/animate.js',
  'bower_components/flickity/js/flickity.js',
  'bower_components/flickity/js/prev-next-button.js',
  'bower_components/flickity/js/page-dots.js',
  'bower_components/flickity/js/drag.js',
  // modules
  'modules/*/*.js'
];

// build scripts.js
gulp.task( 'js', function() {
  gulp.src( jsSrcs )
    .pipe( uglify() )
    .pipe( concat('scripts.js') )
    .pipe( gulp.dest('build') );
});

// copy js into build/, used for dev
gulp.task( 'copy-js', function() {
  var cwd = process.cwd();
  gulp.src( jsSrcs )
    .pipe( through.obj( function( file, encoding, callback ) {
      file.base = cwd;
      return callback( null, file );
    }))
    .pipe( gulp.dest('build/js') );
});

module.exports = function( site ) {

  if ( site.data.isDev ) {
    site.data.jsPaths = utils.getGlobPaths( jsSrcs );
  }

  site.addWatch( 'modules/*/*.js', [ 'copy-js' ] );
};
