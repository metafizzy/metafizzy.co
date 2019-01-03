var gulp = require('gulp');
var frontMatter = require('gulp-front-matter');
var moment = require('moment');
// var marked = require('gulp-marked');
var highlight = require('highlight.js');
var transfob = require('transfob');
var rename = require('gulp-rename');
var utils = require('./utils');

var postsPerPage = 6;

var rePostPath = /(\d\d\d\d\-\d\d\-\d\d)\-([\w\d\-_]+)/;

var postsSrc = '_posts/*/**.md';
var blogPermalinkSrc = 'pages/blog-permalink.mustache';

module.exports = function( site ) {
  var Handlebars = site.Handlebars;

  var blogPermalinkTemplate;

  gulp.task( 'blog-permalink-template', function() {
    return gulp.src( blogPermalinkSrc )
      .pipe( transfob( function( file, enc, callback ) {
        blogPermalinkTemplate = Handlebars.compile( file.contents.toString() );
        callback( null, file );
      }));
  });

  gulp.task( 'posts', gulp.series( 'partials', 'blog-permalink-template' ), function() {
    // reset posts
    site.posts = [];

    return gulp.src( postsSrc )
      .pipe( frontMatter({
        property: 'frontMatter',
        remove: true
      }) )
      // .pipe( marked({
      //   highlight: function( code, lang ) {
      //     return lang ? highlight.highlight( lang, code ).value : code;
      //   }
      // }) )
      .pipe( transfob( function( file, encoding, callback ) {
        // get dateCode and slug from basename
        var basename = utils.getBasename( file.path );
        var matches = basename.match( rePostPath );
        file.dateCode = matches[1];
        file.slug = matches[2];
        // file data
        file.momentDate = moment( file.dateCode );
        file.sortDate = parseInt( file.momentDate.format('YYYYMMDD') );
        file.timestamp = file.momentDate.format('D MMM YYYY');
        file.xmlTimestamp = file.momentDate.format('YYYY-MM-DD') + 'T12:00:00-05:00';
        utils.extend( file, file.frontMatter );
        // add file to posts collection
        if ( file.frontMatter.published !== false ) {
          site.posts.push( file.clone() );
        }
        return callback( null, file );
      },
        // flush function: sort posts and put into pages
        function( callback ) {
          // sort by date
          site.posts.sort( function( a, b ) {
            return b.sortDate - a.sortDate;
          });
          // arrange in pages

          var paginatedPosts = site.paginatedPosts = [];
          site.posts.forEach( function( postFile, i ) {
            var pageIndex = Math.floor( i / postsPerPage );
            // add new array of posts if not there
            paginatedPosts[ pageIndex ] = paginatedPosts[ pageIndex ] || [];
            paginatedPosts[ pageIndex ].push( postFile );
          });

          callback();
        }
      ))
      // templating
      .pipe( transfob( function( file, encoding, callback ) {
        var data = {
          post: file
        };
        utils.extend( data, site.data );
        file.contents = new Buffer( blogPermalinkTemplate( data ) );
        callback( null, file );
      }))
      create post permalink pages
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

  site.watches.push({
    src: blogPermalinkSrc,
    tasks: [ 'posts' ]
  });

};
