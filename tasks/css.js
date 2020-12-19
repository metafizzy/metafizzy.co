var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var utils = require('./utils');

var cssSrcs = [
  'node_modules/normalize.css/normalize.css',
  'node_modules/flickity/css/flickity.css',
  'node_modules/huebee/huebee.css',
  'modules/*/*.css'
];

// build styles.css
gulp.task( 'css', function() {
  return gulp.src( cssSrcs )
    .pipe( concat('styles.css') )
    .pipe( gulp.dest('build') );
});

// copy css, use for dev
var copyCss = gulp.task( 'copy-css', function() {
  return gulp.src( cssSrcs )
    .pipe( rename({
      dirname: ''
    }))
    .pipe( gulp.dest('build/css') );
});

module.exports = function( site ) {
  if ( !site.data.dev ) {
    return;
  }

  var cssPaths = utils.getGlobPaths( cssSrcs );
  site.data.cssPaths = cssPaths.map( function( cssPath ) {
    return utils.getBasename( cssPath ) + '.css';
  });

  gulp.watch( cssSrcs, copyCss );
};
