---
title: "transfob replaces through2 for Gulp plugins"
blurb: transfob is a tiny replacement for through2.obj, ideal for Gulp plugins
image: /img/metafizzy-logo-thumbnail-green.png
---

As Metafizzy uses [Gulp](https://gulpjs.com/) for running tasks, I write a lot of Gulp plugins. For example, here's a simple one to add a file's basename to the [Vinyl](https://github.com/gulpjs/vinyl) `file` object.

``` js
var path = require('path');
var transfob = require('transfob');

gulp.src('content/*.hbs')
  // add basename data
  .pipe( transfob( function( file, enc, next ) {
    file.basename = path.basename( file.path, '.hbs' );
    next( null, file );
  })
  // ..
```

This plugin uses [transfob](https://github.com/metafizzy/transfob), a tiny, no-dependency replacement for [`through2.obj`](https://github.com/rvagg/through2). The name _transfob_ comes from "Transform object." As I dug into `through2`'s source and [node's Stream Transform class](https://nodejs.org/dist/latest-v6.x/docs/api/stream.html#stream_implementing_a_transform_stream), I discovered there wasn't much code needed to work with Gulp streams. It's in fact so small, I can include its entire source code here:

``` js
var Transform = require('stream').Transform;

module.exports = function transfob( _transform ) {
  var transform = new Transform({
    objectMode: true
  });
  transform._transform = _transform;
  return transform;
};
```

I use transfob for [all](https://github.com/metafizzy/isotope-docs) [the](https://github.com/metafizzy/flickity-docs) [Metafizzy](https://github.com/metafizzy/packery-docs) [docs](https://github.com/metafizzy/infinite-scroll-docs) [sites](https://github.com/metafizzy/huebee-docs).

through2 is a proper utility for streams, so you may need it for more heavy lifting. But for my purposes, working with Gulp, transfob is all I need. So, If you're writing Gulp plugins, consider switching out `through2.obj` for [`transfob`](https://github.com/metafizzy/transfob).
