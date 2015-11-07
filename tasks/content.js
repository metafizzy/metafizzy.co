var gulp = require('gulp');
var through = require('through2');
var rename = require('gulp-rename');
var utils = require('./utils');

module.exports = function( site ) {
  var Handlebars = site.Handlebars;
  var posts = site.posts;
  var paginatedPosts = site.paginatedPosts;

  // ----- homepage ----- //

  var homepageSrc = 'pages/homepage.mustache';

  gulp.task( 'content-homepage', [ 'posts', 'partials' ], function() {
    return gulp.src( homepageSrc )
      .pipe( template({
        homepagePosts: posts.slice( 0, 5 )
      }) )
      .pipe( rename('index.html') )
      .pipe( gulp.dest('build') );
  });

  site.addWatch( homepageSrc, [ 'content-homepage' ] );

  // ----- blog ----- //

  var blogSrc = 'pages/blog.mustache';

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

      gulp.src( blogSrc )
        .pipe( template( data ) )
        .pipe( rename( filename ) )
        .pipe( gulp.dest('build') );
    });

  });

  site.addWatch( blogSrc, [ 'content-blog' ] );

  // ----- template ----- //

  // templating plugin, builds content with Handlebars
  function template( data ) {
    data = data || {};
    utils.extend( data, site.data );

    return through.obj( function( file, encoding, callback ) {
      var fileContents = file.contents.toString();
      var tmpl = Handlebars.compile( fileContents );
      file.contents = new Buffer( tmpl( data ) );
      return callback( null, file );
    });
  }

  // ----- content ----- //

  gulp.task( 'content', [
    'content-homepage',
    'content-blog'
  ]);

};
