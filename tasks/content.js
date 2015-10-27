var gulp = require('gulp');
var through = require('through2');
var Handlebars = require('handlebars');
var rename = require('gulp-rename');
var path = require('path');

// ----- vars ----- //

// array of all posts
var posts = [];
// hash of posts per page
var paginatedPosts = [];

// -------------------------- partials -------------------------- //

var registerPartialsTask = require('./partials');
registerPartialsTask( Handlebars );

// -------------------------- posts -------------------------- //

var registerPostsTask = require('./posts');
registerPostsTask( posts, paginatedPosts, Handlebars );

// -------------------------- css -------------------------- //

var cssSources = [
  'bower_components/normalize-css/normalize.css',
  'modules/*/*.css'
];

// -------------------------- content -------------------------- //

// templating plugin, builds content with Handlebars
function template( data ) {
  data = data || {};

  return through.obj( function( file, encoding, callback ) {
    var fileContents = file.contents.toString();
    var tmpl = Handlebars.compile( fileContents );
    file.contents = new Buffer( tmpl( data ) );
    return callback( null, file );
  });
}

// ----- homepage ----- //

gulp.task( 'content-homepage', [ 'posts', 'partials' ], function() {
  return gulp.src('pages/homepage.mustache')
    .pipe( template({
      homepagePosts: posts.slice( 0, 5 )
    }) )
    .pipe( rename('index.html') )
    .pipe( gulp.dest('build') );
});

// ----- blog ----- //

gulp.task( 'content-blog', [ 'posts', 'partials' ], function() {

  paginatedPosts.forEach( function( pagePosts, i ) {
    var currentPage = i + 1;
    var data = {
      pagePosts: pagePosts,
      currentPage: currentPage,
      nextPage: paginatedPosts[ i+1 ] ? currentPage + 1 : null,
      totalPages: paginatedPosts.length
    };
    // previous page
    if ( currentPage > 1 ) {
      data.previousPage = {
        url: currentPage == 2 ? '/blog' : '/blog/page' + ( currentPage - 1 ),
        index: currentPage - 1
      };
    }

    var filename = currentPage == 1 ? 'blog/index.html' :
      'blog/page' + currentPage + '/index.html';

    gulp.src('pages/blog.mustache')
      .pipe( template( data ) )
      .pipe( rename( filename ) )
      .pipe( gulp.dest('build') );
  });

});

// ----- content ----- //

gulp.task( 'content', [
  'content-homepage',
  'content-blog'
]);
