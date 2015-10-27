var gulp = require('gulp');
var rename = require('gulp-rename');
var utils = require('./utils');

var cssSrcs = [
  'bower_components/normalize-css/normalize.css',
  'bower_components/flickity/css/flickity.css',
  'modules/*/*.css'
];

var cssPaths = utils.getGlobPaths( cssSrcs );

gulp.task( 'copy-css', function() {
  gulp.src( cssSrcs )
    .pipe( rename({
      dirname: ''
    }))
    .pipe( gulp.dest('build/css') );
});

module.exports = function( siteData ) {
  siteData.cssPaths = cssPaths.map( function( cssPath ) {
    return utils.getBasename( cssPath ) + '.css';
  });
};
