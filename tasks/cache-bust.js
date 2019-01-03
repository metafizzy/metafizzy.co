var gulp = require('gulp');
var replace = require('gulp-replace');

gulp.task( 'cache-bust-js', function() {
  return gulp.src('modules/scripts/scripts.mustache')
    .pipe( replace( /scripts\.js\?(\d+)/, function( match, num ) {
      num = parseInt( num ) + 1;
      return 'scripts.js?' + num;
    }))
    .pipe( gulp.dest('modules/scripts') );
});

gulp.task( 'cache-bust-css', function() {
  return gulp.src('modules/html-head/html-head.mustache')
    .pipe( replace( /styles\.css\?(\d+)/, function( match, num ) {
      num = parseInt( num ) + 1;
      return 'styles.css?' + num;
    }))
    .pipe( gulp.dest('modules/html-head') );
});

gulp.task( 'cache-bust', gulp.parallel( 'cache-bust-js', 'cache-bust-css' ) );
// shorthand
gulp.task( 'cb', gulp.parallel('cache-bust') );

module.exports = function() {};
