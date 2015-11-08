var gulp = require('gulp');
var rename = require('gulp-rename');
var utils = require('./utils');

var jsSrcs = [
  'modules/*/*.js'
];

var jsPaths = utils.getGlobPaths( jsSrcs );

gulp.task( 'copy-js', function() {
  gulp.src( jsSrcs )
    .pipe( rename({
      dirname: ''
    }))
    .pipe( gulp.dest('build/js') );
});

module.exports = function( site ) {

  site.data.jsPaths = jsPaths.map( function( jsPath ) {
    return utils.getBasename( jsPath ) + '.js';
  });

  site.watches.push({
    src: jsSrcs,
    tasks: [ 'copy-js' ]
  });
};
