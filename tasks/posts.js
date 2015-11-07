var gulp = require('gulp');
var frontMatter = require('gulp-front-matter');
var moment = require('moment');
var marked = require('gulp-marked');
var highlight = require('highlight.js');
var through = require('through2');
var rename = require('gulp-rename');
var fs = require('fs');
var utils = require('./utils');

var postsPerPage = 6;

var rePostPath = /(\d\d\d\d\-\d\d\-\d\d)\-([\w\d\-_]+)/;

var postsSrc = '_posts/2015/**.md';

module.exports = function( site ) {
  var Handlebars = site.Handlebars;
  var posts = site.posts;
  var paginatedPosts = site.paginatedPosts;

  gulp.task( 'posts', [ 'partials' ], function() {

    var blogPermalinkSrc = fs.readFileSync( 'pages/blog-permalink.mustache', 'utf8' );
    var blogPermalinkTemplate = Handlebars.compile( blogPermalinkSrc );

    return gulp.src( postsSrc )
      .pipe( frontMatter({
        property: 'frontMatter',
        remove: true
      }) )
      .pipe( marked({
        highlight: function( code ) {
          return highlight.highlightAuto( code ).value;
        }
      }) )
      .pipe( through.obj( function( file, encoding, callback ) {
        // get dateCode and slug from basename
        var basename = utils.getBasename( file.path );
        var matches = basename.match( rePostPath );
        file.dateCode = matches[1];
        file.slug = matches[2];
        // file data
        file.date = new Date( file.dateCode ); // used for sorting
        file.timestamp = moment( file.date ).format('D MMM YYYY');
        file.title = file.frontMatter.title;
        // add file to posts collection
        posts.push( file.clone() );
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
      // templating
      .pipe( through.obj( function( file, encoding, callback ) {
        var data = {
          post: file
        };
        file.contents = new Buffer( blogPermalinkTemplate( data ) );
        callback( null, file );
      }))
      // create post permalink pages
      .pipe( rename( function( postPath ) {
        var matches = postPath.basename.match( rePostPath );
        postPath.dirname = 'blog/' + matches[2];
        postPath.basename = 'index';
        postPath.extname = '.html';
      }))
      .pipe( gulp.dest('build') );

  });

  site.watches.push({
    src: postsSrc,
    tasks: [ 'posts' ]
  });

};

