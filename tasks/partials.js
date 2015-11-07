var gulp = require('gulp');
var through = require('through2');

var utils = require('./utils');

var partialsSrc = 'modules/*/*.mustache';

// registers partials task
// requires Handlebars instance
module.exports = function( site ) {
  var Handlebars = site.Handlebars;

  // register all modules/*/*.mustache files as partials
  gulp.task( 'partials', function() {
    return gulp.src( partialsSrc )
      .pipe(
        through.obj( function( file, encoding, callback ) {
        var name = utils.getBasename( file.path );
        var tmpl = file.contents.toString();
        Handlebars.registerPartial( name, tmpl );
        callback( null, file );
      }) );
  });


  site.watches.push({
    src: partialsSrc,
    tasks: [ 'partials' ]
  });

};
