/* jshint node: true, strict: false */

var gulp = require('gulp');

// ----- site ----- //

// stuff used across tasks
var site = {
  // templating data
  data: {
    dev: process.argv[2] == 'dev',
    // array of all posts
    posts: [],
    // hash of posts per page
    paginatedPosts: [],
  },
};

// ----- assets ----- //

var assetsSrc = 'assets/**/*.*';

// copy assets to build
gulp.task( 'assets', function() {
  return gulp.src( assetsSrc )
    .pipe( gulp.dest('build') );
});

if ( site.data.dev ) {
  gulp.watch( assetsSrc, gulp.parallel('assets') );
}

// ----- tasks ----- //

require('./tasks/css')( site );
require('./tasks/js')( site );
require('./tasks/cache-bust')( site );
require('./tasks/posts')( site );
require('./tasks/content')( site );

// ----- serve ----- //

var serve = require('gulp-serve');

gulp.task( 'serve', serve('build') );

// ----- default ----- //

gulp.task( 'default', gulp.series(
  'assets',
  'css',
  'js',
  'content'
));

// ----- dev ----- //

gulp.task( 'dev',
  gulp.series( 'assets', 'copy-css', 'copy-js', 'content', 'serve' )
);
