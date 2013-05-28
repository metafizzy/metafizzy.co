---

title: imagesLoaded v3
category: blog
layout: blog

---

[imagesLoaded just got a big upgrade this week](http://desandro.github.io/imagesloaded). It just got a whole lot more reliable and consistent across browsers.

[![imagesLoaded](http://i.imgur.com/bhH0cj8.png)](http://desandro.github.io/imagesloaded)

Prior to the fresh version 3, imagesLoaded relied on a hack, flipping out an images `src` in order to clear it from a browser cache. Now, the script checks for `naturalWidth`, and then fallbacks to listening for `load` or `error` event on proxy images.

You can thank [@Darsain](http://darsa.in) for revising the code. Checking for loading images is actually a tricky endeavor, as various browsers have bizarre quirks involved with loading and caching images. This latest revision is a fine piece of work, as it resolves all the previous bugginess. I owe you, Tomas.

imagesLoaded is an important component library for [Masonry](http://masonryjs.com), [Isotope](http://isotopejs.com), and [Packery](http://packeryjs.com). Without it, using images in dynamic layout libraries would be slow and ugly. I'm jazzed to keep support for this resource going, in its third year of development.
