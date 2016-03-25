---
title: $(window).load() is a last resort
---

I continue to see develpers rely on the `window` `load` event in their code. Typically it's used to run code after all images have been loaded. For example, when used with Masonry, Packery, or [Isotope](http://isotope.metafizzy.co):

``` js
$(window).load( function() {
  $('.grid').isotope({
    // isotope options...
  });
});
```

Let me be clear: **Don't do this.**

`$(window).load()` should only be used as a last resort. That's because `load` has to wait for _everything_ else to load. From on [GlobalEventHandlers.onload MDN](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload)

> The `load` event fires at the end of the document loading process. At this point, all of the objects in the document are in the DOM, and all the images, scripts, links and sub-frames have finished loading.

`load` waits for every asset on the page to load: every image, JS file, CSS file, and iframe — plus media like audio, video, or fonts.

Rather than waiting for everything, use a smaller scoped event so you only wait for specific assets. [imagesLoaded](http://imagesloaded.desandro.com) is perfect for this as it allows you to target a set of images. Your code runs as soon as the necessary images are loaded, rather than after all assets. From [Isotope - imagesLoaded](http://isotope.metafizzy.co/layout.html#imagesloaded):

``` js
var $grid = $('.grid').imagesLoaded( function() {
  // init Isotope when grid's images have loaded
  $grid.isotope({
    // options...
  });
});
```

Or initialize isotope, then trigger layout as images load:

``` js
// init Isotope
var $grid = $('.grid').isotope({
  // options...
});
// layout Isotope after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.isotope('layout');
});
```

Chances are, there's a faster way to detect what you're loading, rather than using `$(window).load()`. [Web fonts have a loader API](https://github.com/typekit/webfontloader#events). [`<video>` and `<audio>` have load events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events).

Only use `load` if you absolutely have to. By avoiding it, you'll be making your sites faster and me happier :)
