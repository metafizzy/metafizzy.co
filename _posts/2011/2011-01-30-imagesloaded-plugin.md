---

title: imagesLoaded plugin
category: blog
layout: blog

---

Dealing with images has always been troublesome for Masonry. To calculate the appropriate amount of space, Masonry's layout algorithm needs the size of each item element. If an image isn't loaded, that space does not get appropriately measured, and causes the layout to be thrown off.

There are several methods to resolve this issue, but the ideal solution would be a plugin that would trigger a callback after all images within some content are loaded. Fortunately, Paul Irish has already done most of the work in his [imagesLoaded plugin](https://gist.github.com/268257).

I've subsequently forked the [imagesLoaded plugin for use with Masonry and Isotope](https://gist.github.com/797120).

<script src="https://gist.github.com/797120.js?file=jquery.imagesloaded.js"> </script>

Now Masonry users no longer have to rely on `$(window).load()` to load every image on the page before the plugin is triggered.

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/desandro/RXDL4/embedded/js,result,html,css"> </iframe>

[imagesLoaded and Masonry fiddle](http://jsfiddle.net/desandro/RXDL4/)

Additionally, you can use `imagesLoaded` inside the Infinite Scroll callback.

``` javascript
// call masonry as a callback
function( newElements ) {
  var $elems = $(newElements);

  $elems.imagesLoaded( function(){
    $('#container').masonry({ appendedContent: $elems })
  })
}
```