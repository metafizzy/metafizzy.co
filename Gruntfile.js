// -------------------------- grunt -------------------------- //

/*jhint node: true, usued: true, undef: true */

var cssFiles = [
  'assets/css/normalize.css',
  'assets/css/base.css',
  'assets/css/transition-links.css',
  'assets/css/homepage.css',
  'assets/css/blog.css',
  'assets/css/order-status.css',
  'assets/css/syntax-highlight.css',
  'assets/css/404.css'
];

module.exports = function( grunt ) {

  grunt.initConfig({
    concat: {
      css: {
        src: cssFiles,
        dest: 'assets/css/style.css'
      }
    },

    watch: {
      content: {
        files: cssFiles,
        tasks: [ 'concat:css' ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask( 'default', [
    'concat'
  ]);

};
