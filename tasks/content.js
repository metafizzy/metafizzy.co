var gulp = require('gulp');
var rename = require('gulp-rename');
var frontMatter = require('gulp-front-matter');
var hb = require('gulp-hb');
var path = require('path');
var merge2 = require('merge2');
var transfob = require('transfob');

module.exports = function( site ) {

  // ----- blog ----- //

  var blogSrc = 'page-templates/blog-page.hbs';

  gulp.task( 'build-blog-pages', function() {
    var paginatedPosts = site.data.paginatedPosts;

    var paginatedTasks = paginatedPosts.map( function( pagePosts, i ) {
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
        `blog/page${currentPage}/index.html`;

      return gulp.src( blogSrc )
        .pipe( template( data ) )
        .pipe( rename( filename ) )
        .pipe( gulp.dest('build') );
    });
    // create a merged stream for array of streams
    return merge2( paginatedTasks );
  });

  var contentBlogPages = gulp.series( 'posts', 'build-blog-pages' );
  gulp.task( 'content-blog-pages', contentBlogPages );

  if ( site.data.dev ) {
    gulp.watch( blogSrc, contentBlogPages );
  }

  // ----- pages ----- //

  var pagesSrc = '_pages/**/*.hbs';

  gulp.task( 'build-pages', function() {
    return gulp.src( pagesSrc )
      .pipe( frontMatter({
        property: 'frontMatter',
        remove: true,
      }) )
      // page-specific data
      .pipe( template({
        homepagePosts: site.data.posts.slice( 0, 5 ),
        rssUpdated: site.data.posts[0].xmlTimestamp,
      }) )
      // add path from frontMatter.path
      .pipe( transfob( function( file, encoding, callback ) {
        if ( file.frontMatter.path ) {
          file.path = 'build/' + file.frontMatter.path;
        }
        callback( null, file );
      }) )
      .pipe( gulp.dest('build') );
  });

  var contentPages = gulp.series( 'posts', 'build-pages' );
  gulp.task( 'content-pages', contentPages );

  if ( site.data.dev ) {
    gulp.watch( pagesSrc, contentPages );
  }

  // ----- template ----- //

  // templating plugin, builds content with Handlebars
  function template( data ) {
    return hb()
      .partials( 'modules/*/*.hbs', {
        parsePartialName: function( options, file ) {
          return path.basename( file.path, '.hbs' );
        }
      })
      .data( site.data )
      .data( data );
  }

  // ----- content ----- //

  var content = gulp.series(
    'posts',
    gulp.parallel(
      'build-blog-pages',
      'build-pages'
    )
  );
  gulp.task( 'content', content );

  if ( site.data.dev ) {
    gulp.watch( [ site.postsSrc, site.blogPermalinkSrc ], content );
  }

};
