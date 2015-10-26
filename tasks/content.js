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

// array of all posts
var posts = [];
var postsPerPage = 6;
// hash of posts per page
var pagePosts = {};

gulp.task( 'posts', function() {
  return gulp.src('_posts/2015/**.md')
    // .pipe( frontMatter({
    //   property: 'frontMatter',
    //   remove: true
    // }) )
    .pipe( through.obj( function( file, encoding, callback ) {
      var basename = path.basename( file.path, path.extname( file.path ) );
      // get dateCode and slug
      var matches = basename.match(/(\d\d\d\d\-\d\d\-\d\d)\-([\w\d\-_]+)/);
      file.dateCode = matches[1];
      file.slug = matches[2];
      // get markdown html
      var contents = file.contents.toString();
      file.contentHTML = 
      
      posts.push( file );
      return callback( null, file );
    },
    function( callback ) {
      // sort newest first
      posts.sort( function( a, b ) {
        return a.dateCode < b.dateCode;
      });

      posts.forEach( function( postFile, i ) {
        var pageIndex = Math.ceil( i / postsPerPage );
        pagePosts[ pageIndex ] = pagePosts[ pageIndex ] || [];
        pagePosts[ pageIndex ].push( postFile );
      });

      callback();
    }) );


});

gulp.task('content-blog', [ 'posts' ], function() {

  var data = {
    posts: posts
  };
  return gulp.src('pages/blog.mustache')
    .pipe( template( data ) )
    .pipe( rename('blog/index.html') )
    .pipe( gulp.dest('build') );
});

// ----- content ----- //

gulp.task( 'content', [
  'content-homepage'
]);
