var gulp = require('gulp');
var through = require('through2');

var utils = require('./utils');

// registers partials task
// requires Handlebars instance
module.exports = function( Handlebars ) {
  // register all modules/*/*.mustache files as partials
  gulp.task( 'partials', function() {
    return gulp.src('modules/*/*.mustache')
      .pipe( 
        through.obj( function( file, encoding, callback ) {
        var name = utils.getBasename( file.path );
        var tmpl = file.contents.toString();
        Handlebars.registerPartial( name, tmpl );
        callback( null, file );
      }) );
  });
};