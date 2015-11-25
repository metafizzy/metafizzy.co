var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var utils = require('./utils');

var cssSrcs = [
  'bower_components/normalize-css/normalize.css',
  'bower_components/flickity/css/flickity.css',
  'modules/*/*.css'
];

// build styles.css
gulp.task( 'css', function() {
  gulp.src( cssSrcs )
    .pipe( concat('styles.css') )
    .pipe( gulp.dest('build') );
});

// copy css, use for dev
gulp.task( 'copy-css', function() {
  gulp.src( cssSrcs )
    .pipe( rename({
      dirname: ''
    }))
    .pipe( gulp.dest('build/css') );
});

module.exports = function( site ) {

  if ( site.data.isDev ) {
    var cssPaths = utils.getGlobPaths( cssSrcs );
    site.data.cssPaths = cssPaths.map( function( cssPath ) {
      return utils.getBasename( cssPath ) + '.css';
    });
  }

  site.addWatch( cssSrcs, [ 'copy-css' ] );

};
