module.exports = function( site ) {
  return {
    domainAbsoluteURL: function( url ) {
      if ( !url.match( /^\/[\w]/ ) ) {
        return url;
      }
      // add absolute URL
      var domain = site.data.dev ? 'http://localhost:3000' : 'https://metafizzy.co';
      return domain + url;
    },
  };
};
