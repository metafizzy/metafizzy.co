var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var utils = require('./utils');
var transfob = require('transfob');

var jsSrcs = [
  'node_modules/get-size/get-size.js',
  'node_modules/desandro-matches-selector/matches-selector.js',
  'node_modules/ev-emitter/ev-emitter.js',
  'node_modules/fizzy-ui-utils/utils.js',
  // draggabilly
  'node_modules/unipointer/unipointer.js',
  'node_modules/unidragger/unidragger.js',
  'node_modules/draggabilly/draggabilly.js',
  // outlayer
  'node_modules/outlayer/item.js',
  'node_modules/outlayer/outlayer.js',
  // masonry
  'node_modules/masonry-layout/masonry.js',
  // packery
  'node_modules/packery/js/rect.js',
  'node_modules/packery/js/packer.js',
  'node_modules/packery/js/item.js',
  'node_modules/packery/js/packery.js',
  // isotope
  'node_modules/isotope-layout/js/layout-mode.js',
  'node_modules/isotope-layout/js/item.js',
  'node_modules/isotope-layout/js/isotope.js',
  'node_modules/isotope-layout/js/layout-modes/fit-rows.js',
  // flickity
  'node_modules/flickity/js/cell.js',
  'node_modules/flickity/js/slide.js',
  'node_modules/flickity/js/animate.js',
  'node_modules/flickity/js/flickity.js',
  'node_modules/flickity/js/prev-next-button.js',
  'node_modules/flickity/js/page-dots.js',
  'node_modules/flickity/js/drag.js',
  // infinite-scroll
  'node_modules/infinite-scroll/js/core.js',
  'node_modules/infinite-scroll/js/scroll-watch.js',
  // huebee
  'node_modules/huebee/huebee.js',
  // modules
  'modules/*/*.js'
];

// build scripts.js
gulp.task( 'js', function() {
  return gulp.src( jsSrcs )
    .pipe( uglify() )
    .pipe( concat('scripts.js') )
    .pipe( gulp.dest('build') );
});

// copy js into build/, used for dev
var copyJs = gulp.task( 'copy-js', function() {
  var cwd = process.cwd();
  return gulp.src( jsSrcs )
    .pipe( transfob( function( file, encoding, callback ) {
      file.base = cwd;
      return callback( null, file );
    }))
    .pipe( gulp.dest('build/js') );
});

module.exports = function( site ) {
  if ( !site.data.dev ) {
    return;
  }

  site.data.jsPaths = utils.getGlobPaths( jsSrcs );

  gulp.watch( 'modules/*/*.js', copyJs );
};
