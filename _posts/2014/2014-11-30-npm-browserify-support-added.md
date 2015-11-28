---

title: 'npm &amp; Browserify support added to Isotope, Packery, &amp; Masonry'
category: blog
layout: blog

---

Isotope, Packery, Masonry, [Draggabilly](http://draggabilly.desandro.com/), and [imagesLoaded](http://imagesloaded.desandro.com/) all got big upgrades in the past weeks, adding npm and [Browserify](http://browserify.org/) support. Now using these libraries with Browserify is as simple as a couple lines of code:

``` bash
npm install isotope-layout
```

``` js
var Isotope = require('isotope-layout');

var iso = new Isotope( '#container', {
  // options...
});
```

Look over the specific docs for more details for each library.

+ [Isotope Browserify](http://isotope.metafizzy.co/appendix.html#browserify), [isotope-layout on npm](https://npmjs.org/package/isotope-layout)
+ [Packery Browserify](http://packery.metafizzy.co/appendix.html#browserify), [packery on npm](https://npmjs.org/package/packery)
+ [Masonry Browserify](http://masonry.desandro.com/appendix.html#browserify), [masonry-layout on npm](https://npmjs.org/package/masonry-layout)

---

Getting Browserify support meant adding CommonJS export to the libraries, and all to all their dependencies. I used the [UMD spec](https://github.com/umdjs/umd/blob/master/returnExportsGlobal.js), which has exports to support AMD, CommonJS, and browser globals. Here's Masonry's exports:

``` js
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( [
      'outlayer/outlayer',
      'get-size/get-size'
    ],
    masonryDefinition );
} else if ( typeof exports === 'object' ) {
  // CommonJS
  module.exports = masonryDefinition(
    require('outlayer'),
    require('get-size')
  );
} else {
  // browser global
  window.Masonry = masonryDefinition(
    window.Outlayer,
    window.getSize
  );
}
```

Adding CommonJS support is a simple task, but getting it done required updating all those dependency libraries. So much code wrangling.

+ [get-style-property](https://github.com/desandro/get-style-property)
+ [get-size](https://github.com/desandro/get-size)
+ [eventie](https://github.com/desandro/eventie)
+ [doc-ready](https://github.com/desandro/doc-ready)
+ [jquery-bridget](https://github.com/desandro/jquery-bridget)
+ [matches-selector](https://github.com/desandro/matches-selector)
+ [Outlayer](https://github.com/metafizzy/outlayer)
+ [classie](https://github.com/desandro/classie)
+ [isotope-cells-by-column](https://github.com/metafizzy/isotope-cells-by-column)
+ [isotope-cells-by-row](https://github.com/metafizzy/isotope-cells-by-row)
+ [isotope-fit-columns](https://github.com/metafizzy/isotope-columns)
+ [isotope-masonry-horizontal](https://github.com/metafizzy/isotope-masonry-horizontal)
+ [isotope-packery](https://github.com/metafizzy/isotope-packery)
+ [isotope-horizontal](https://github.com/metafizzy/isotope-horizontal)

They're all up on npm and ready for Browserifying. Have at it!
