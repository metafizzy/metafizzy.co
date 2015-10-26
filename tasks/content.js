var gulp = require('gulp');
var through = require('through2');
var Handlebars = require('handlebars');
var rename = require('gulp-rename');
var frontMatter = require('gulp-front-matter');
var path = require('path');

function template( data ) {
  // defaults
  data = data || {};

  return through.obj( function( file, encoding, callback ) {
    var fileContents = file.contents.toString();
    var tmpl = Handlebars.compile( fileContents );
    file.contents = new Buffer( tmpl( data ) );
    return callback( null, file );
  });
}

// ----- homepage ----- //

gulp.task( 'content-homepage', function() {
  return gulp.src('pages/homepage.mustache')
    .pipe( template() )
    .pipe( rename('index.html') )
    .pipe( gulp.dest('build') );
});

// ----- blog ----- //

var moment = require('moment');
var marked = require('gulp-marked');
var highlight = require('highlight.js');

// array of all posts
var posts = [];
var postsPerPage = 6;
// hash of posts per page
var paginatedPosts = [];

gulp.task( 'posts', function() {
  var rePostPath = /(\d\d\d\d\-\d\d\-\d\d)\-([\w\d\-_]+)/;

  return gulp.src('_posts/2015/**.md')
    .pipe( frontMatter({
      property: 'frontMatter',
      remove: true
    }) )
    .pipe( through.obj( function( file, encoding, callback ) {
      // get dateCode and slug from basename
      var basename = path.basename( file.path, path.extname( file.path ) );
      var matches = basename.match( rePostPath );
      file.dateCode = matches[1];
      file.slug = matches[2];
      // file data
      file.date = new Date( file.dateCode ); // used for sorting
      file.timestamp = moment( file.date ).format('D MMM YYYY');
      file.title = file.frontMatter.title;

      posts.push( file );
      return callback( null, file );
    },
      // flush function: sort posts and put into pages
      function( callback ) {
        // sort by date
        posts.sort( function( a, b ) {
          return b.date - a.date;
        });
        // arrange in pages
        posts.forEach( function( postFile, i ) {
          var pageIndex = Math.floor( i / postsPerPage );
          // add new array of posts if not there
          paginatedPosts[ pageIndex ] = paginatedPosts[ pageIndex ] || [];
          paginatedPosts[ pageIndex ].push( postFile );
        });

        callback();
      }
    ))
    .pipe( marked({
      highlight: function( code ) {
        return highlight.highlightAuto( code ).value;
      }
    }) )
    // create post permalink pages
    .pipe( rename( function( postPath ) {
      var matches = postPath.basename.match( rePostPath );
      postPath.dirname = 'blog/' + matches[2];
      postPath.basename = 'index';
      postPath.extname = '.html';
    }))
    .pipe( gulp.dest('build') );

});

gulp.task( 'content-blog', [ 'posts' ], function() {

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
