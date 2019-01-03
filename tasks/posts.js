var gulp = require('gulp');
var frontMatter = require('gulp-front-matter');
var moment = require('moment');
var markdown = require('gulp-markdown');
var highlight = require('highlight.js');
var transfob = require('transfob');
var rename = require('gulp-rename');
var utils = require('./utils');
var hb = require('gulp-hb');
var hbLayouts = require('handlebars-layouts');
var path = require('path');
var getHelpers = require('./utils/get-handlebars-helpers');

var postsPerPage = 6;

var rePostPath = /(\d\d\d\d\-\d\d\-\d\d)\-([\w\d\-_]+)/;

var postsSrc = '_posts/*/**.md';

module.exports = function( site ) {

  gulp.task( 'posts-metadata', function() {
    // reset posts
    site.posts = [];

    return gulp.src( postsSrc )
      .pipe( frontMatter({
        property: 'frontMatter',
        remove: true
      }) )
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
      }));
  });

  gulp.task( 'sort-posts', function( callback ) {
    // sort by date
    site.posts.sort( function( a, b ) {
      return b.sortDate - a.sortDate;
    });
    // create paginatedPosts
    var paginatedPosts = site.paginatedPosts = [];
    site.posts.forEach( function( postFile, i ) {
      var pageIndex = Math.floor( i / postsPerPage );
      // add new array of posts if not there
      paginatedPosts[ pageIndex ] = paginatedPosts[ pageIndex ] || [];
      paginatedPosts[ pageIndex ].push( postFile );
    });

    callback();
  });

  var helpers = getHelpers( site );

  gulp.task( 'build-posts', function() {
    // reset posts
    site.posts = [];

    return gulp.src( postsSrc )
      .pipe( frontMatter({
        property: 'data.post',
        remove: true
      }) )
      .pipe( markdown({
        highlight: function( code, lang ) {
          return lang ? highlight.highlight( lang, code ).value : code;
        }
      }) )
      .pipe( transfob( function( file, enc, next ) {
        var contents = file.contents.toString();
        contents = '{{#extend "blog-permalink"}}{{#content "main"}}' + contents +
          '{{/content}}{{/extend}}';
        file.contents = Buffer.from( contents );
        next( null, file );
      }))
      // templating
      .pipe( hb()
        .partials('pages/blog-permalink.hbs')
        .partials( 'modules/*/*.hbs', {
          parsePartialName: function( options, file ) {
            return path.basename( file.path, '.hbs' );
          }
        })
        .data( site.data )
        .helpers( hbLayouts )
        .helpers( helpers )
      )
      // create post permalink pages
      .pipe( rename( function( postPath ) {
        var matches = postPath.basename.match( rePostPath );
        postPath.dirname = 'blog/' + matches[2];
        postPath.basename = 'index';
        postPath.extname = '.html';
      }))
      .pipe( gulp.dest('build') );
  });

  gulp.task( 'posts',
    gulp.series(
      'posts-metadata',
      'sort-posts',
      'build-posts'
    )
  );

  // ----- watch ----- //

  site.watches.push({
    src: postsSrc,
    tasks: [ 'posts' ]
  });

  // site.watches.push({
  //   src: blogPermalinkSrc,
  //   tasks: [ 'posts' ]
  // });

};
