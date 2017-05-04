---
title: "Isotope v3 released: stagger in, IE8 out"
---

[Isotope v3 is Metafizzy's flagship product](http://isotope.metafizzy.co) — the best JavaScript library for filtering and sorting dynamic layouts. It just got a whole lot better with new version 3. We dropped support for IE8 & 9, and Android 2.3. In doing so, we were able to shed 800 lines of code to make Isotope's filesize 20% smaller. We added a [new option to stagger item transitions](http://isotope.metafizzy.co/options.html#stagger) ([finally](https://github.com/desandro/masonry/issues/540)).

![Isotope stagger transition](https://i.imgur.com/NK0hbMu.gif)

Staggered transitions are a small change to animation behavior, but the result is subtly compelling. The reveal and hide animations appear more natural.

<p data-height="400" data-theme-id="dark" data-slug-hash="WwavbO" data-default-tab="result" data-user="desandro" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/desandro/pen/WwavbO/">Isotope - stagger</a> by David DeSandro (<a href="http://codepen.io/desandro">@desandro</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

We simplified [using Isotope with Webpack](http://isotope.metafizzy.co/extras.html#webpack). Now your `webpack.config.js` only requires two aliases.

``` js
module.exports = {
  resolve: {
    alias: {
      'masonry': 'masonry-layout',
      'isotope': 'isotope-layout'
    }
  }
};
```

Best part: Isotope v3 is backward compatible with Isotope v2. Upgrade worry free. All your previous code will continue to work: jQuery plugin, events, methods, etc.

Open-source projects rarely get to version 2. I'm proud that Isotope has made it all the way to version 3.

We've been pushing out a bunch major version upgrades to our projects in 2016: [Masonry v4, imagesLoaded v3](/blog/masonry-v4-imagesloaded-v4-drop-ie8/), [Packery v2](/blog/packery-v2-released/), now Isotope v3. Next up: [Flickity](http://flickity.metafizzy.co) v2.
