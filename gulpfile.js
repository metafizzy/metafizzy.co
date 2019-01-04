/* jshint node: true, strict: false */

var gulp = require('gulp');

// ----- site ----- //

// stuff used across tasks
var site = {
  // templating data
  data: {
    dev: process.argv[2] == 'dev'
  },
  // array of all posts
  posts: [],
  // hash of posts per page
  paginatedPosts: [],
  // src to watch, tasks to trigger
  watches: [],
  addWatch: function( src, tasks ) {
    site.watches.push({
      src: src,
      tasks: tasks
    });
  }
};

// ----- assets ----- //

var assetsSrc = 'assets/**/*.*';

// copy assets to build
gulp.task( 'assets', function() {
  return gulp.src( assetsSrc )
    .pipe( gulp.dest('build') );
});


site.addWatch( assetsSrc, [ 'assets' ] );

// ----- tasks ----- //

require('./tasks/posts')( site );
require('./tasks/css')( site );
require('./tasks/js')( site );
require('./tasks/content')( site );
require('./tasks/cache-bust')( site );

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
