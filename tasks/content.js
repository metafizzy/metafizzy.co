var gulp = require('gulp');
var transfob = require('transfob');
var rename = require('gulp-rename');
var utils = require('./utils');

module.exports = function( site ) {
  var Handlebars = site.Handlebars;

  // ----- homepage ----- //

  var homepageSrc = 'pages/homepage.mustache';

  gulp.task( 'content-homepage', gulp.series(  gulp.parallel( 'posts', 'partials' ), function() {
    var homepagePosts = site.posts.slice( 0, 5 );
    return gulp.src( homepageSrc )
      .pipe( template({
        homepagePosts: homepagePosts
      }) )
      .pipe( rename('index.html') )
      .pipe( gulp.dest('build') );
  }));

  site.addWatch( homepageSrc, [ 'content-homepage' ] );

  // ----- blog ----- //

  var blogSrc = 'pages/blog.mustache';

  gulp.task( 'content-blog', gulp.series( gulp.parallel( 'posts', 'partials' ), function() {
    var paginatedPosts = site.paginatedPosts;

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

  }));

  site.addWatch( blogSrc, [ 'content-blog' ] );

  // ----- blog archive ----- //

  var blogArchiveSrc = 'pages/blog-archive.mustache';

  gulp.task( 'content-blog-archive', gulp.series( gulp.parallel( 'posts', 'partials' ), function() {
    return gulp.src( blogArchiveSrc )
      .pipe( template({
        posts: site.posts
      }) )
      .pipe( rename('index.html') )
      .pipe( gulp.dest('build/blog/archive') );
  }));

  site.addWatch( blogArchiveSrc, [ 'content-blog-archive' ] );

  // ----- rss ----- //

  var rssFeedSrc = 'pages/rss-feed.mustache';

  gulp.task( 'content-rss', gulp.series( 'posts', function() {
    return gulp.src( rssFeedSrc )
      .pipe( template({
        updated: site.posts[0].xmlTimestamp,
        posts: site.posts
      }) )
      .pipe( rename('index.xml') )
      .pipe( gulp.dest('build/feed') );
  }));

  site.addWatch( rssFeedSrc, [ 'content-rss' ] );

  // ----- 404 ----- //

  var fourOhFourSrc = 'pages/404.mustache';

  gulp.task( 'content-404', gulp.series( 'partials', function() {
    return gulp.src( fourOhFourSrc )
      .pipe( template() )
      .pipe( rename('404.html') )
      .pipe( gulp.dest('build') );
  }));

  site.addWatch( fourOhFourSrc, [ 'content-404' ] );

  // ----- template ----- //

  // templating plugin, builds content with Handlebars
  function template( data ) {
    data = data || {};
    utils.extend( data, site.data );

    return transfob( function( file, encoding, callback ) {
      var fileContents = file.contents.toString();
      var tmpl = Handlebars.compile( fileContents );
      file.contents = Buffer.from( tmpl( data ) );
      return callback( null, file );
    });
  }

  // ----- content ----- //

  gulp.task( 'content', gulp.parallel(
    'content-homepage',
    // 'content-blog',
    'content-blog-archive',
    'content-rss',
    'content-404'
  ));

};
