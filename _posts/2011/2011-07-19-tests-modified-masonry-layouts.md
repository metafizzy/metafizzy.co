---

title: Tests &amp; modified Masonry&nbsp;layouts
category: blog
layout: blog

---

If you've ever took a peak into [Isotope's source](https://github.com/desandro/isotope/tree/master/_posts/tests), you might have [come across the tests](http://isotope.metafizzy.co/tests/). These are mostly pages where I double-check that features work appropriately, or verify that bugs occur with certain content. More recently, I've been building out [modified layout modes](http://isotope.metafizzy.co/docs/extending-isotope.html) that incorporate some of the newer features of [Masonry v2](/blog/masonry-v2-released). While these features are not exactly guaranteed to work flawlessly together with one another, they do provide some missing functionality.

+ [Masonry centered for Isotope](http://isotope.metafizzy.co/custom-layout-modes/centered-masonry.html)
+ [Masonry with gutters for Isotope](http://isotope.metafizzy.co/custom-layout-modes/masonry-gutters.html)
+ [Masonry corner stamp for Isotope](http://isotope.metafizzy.co/custom-layout-modes/masonry-corner-stamp.html)

To use these mods, you'll need to copy the revised `$.Isotope.prototype` methods than can be found in the page source.