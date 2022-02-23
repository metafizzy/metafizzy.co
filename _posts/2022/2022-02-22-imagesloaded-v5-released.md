---
title: imagesLoaded v5 released
image: /img/2022/imagesloaded-v5.png
blurb: imagesLoaded v5 has been released with proper support for srcset and picture
---

[![imagesloaded v5](/img/2022/imagesloaded-v5.png)](https://imagesloaded.desandro.com)

Ladies & gentleman of the jury, if it may please your honor, I give you a new major version of imagesLoaded, v5. [imagesLoaded](https://imagesloaded.desandro.com) is a small-ish JavaScript plugin to detect when images have been loaded on the page. v5 brings some hotly requested features:

- Added proper support for `srcset`
- Added proper support for `<picture>`
- Refactored with ES2018
- Added support for `crossOrigin` attribute
- BREAKING - dropped support for Internet Explorer

The `srcset` and `<picture>` support have been a long time coming. You can now use imagesLoaded with modern image markup.
  
imagesLoaded plays a key role with [Masonry](https://masonry.desandro.com), [Isotope](https://isotope.metafizzy.co), and [Flickity](https://flickity.metafizzy.co). In order to layout elements with JavaScript, you need to know the element's size. And to measure the element's size, you need to know when images are loaded. imagesLoaded solves for that. It's been instrumental to the success of Metafizzy's plugins.

[imagesLoaded first started a gist by Paul Irish.](https://github.com/desandro/imagesloaded/commit/fe3a5794acc9c978c96381aabde00e03c73b6c04) It's now 12 years old.

See [imagesloaded.desandro.com](https://imagesloaded.desandro.com) to complete documentation.
