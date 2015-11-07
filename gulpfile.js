/* jshint node: true, strict: false */

var gulp = require('gulp');
var Handlebars = require('handlebars');

// ----- site ----- //

// stuff used across tasks
var site = {
  // templating data
  data: {},
  // array of all posts
  posts: [],
  // hash of posts per page
  paginatedPosts: [],
  Handlebars: Handlebars,
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

require('./tasks/partials')( site );
require('./tasks/posts')( site );
require('./tasks/css')( site );
require('./tasks/content')( site );

// ----- serve ----- //

var serve = require('gulp-serve');

gulp.task( 'serve', serve('build') );

// ----- default ----- //

gulp.task( 'default', [
  'assets',
  'copy-css',
  'content'
]);

// ----- watch ----- //

gulp.task( 'watch', [ 'default', 'serve' ], function() {
  site.watches.forEach( function( watchable ) {
    gulp.watch( watchable.src, watchable.tasks );
  });
});
