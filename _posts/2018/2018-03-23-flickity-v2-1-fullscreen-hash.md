---
title: 'Flickity v2.1: fullscreen, hash, & more'
blurb: I released a new version of Flickity with all new features including fullscreen view, URL hash, change event and more.
image: /img/2018/flickity-wide.png
---

![Flickity](/img/2018/flickity-wide.png)

Happy birthday Flickity! [3 years old!](/blog/flickity-v1-released/) Flickity has grown to be Metafizzy's second most popular library. As such, it deserved some new goodies in a big new release, v2.1.

## Fullscreen

View Flickity fullscreen by enabling [`fullscreen`](https://flickity.metafizzy.co/options.html#fullscreen). Click the fullscreen button to resize the carousel to take up the entire browser window. Now you don't need a separate library to zoom images. ENHANCE.

<blockquote class="twitter-video" data-lang="en"><p lang="en" dir="ltr">🆕 Flickity v2.1 fullscreen. 3 years of waiting over. ENHANCE <a href="https://t.co/m5tqygjYOk">https://t.co/m5tqygjYOk</a> <a href="https://t.co/AlKpConJd6">pic.twitter.com/AlKpConJd6</a></p>&mdash; Dave DeSandro (@desandro) <a href="https://twitter.com/desandro/status/975793741637316608?ref_src=twsrc%5Etfw">March 19, 2018</a></blockquote>

Hit `ESC` to exit fullscreen. Flickity fullscreen comes with its own API with [`viewFullscreen` and `exitFullscreen` methods](https://flickity.metafizzy.co/api.html#fullscreen).

This feature was a long time coming. It was [first requested](https://github.com/metafizzy/flickity/issues/28) while Flickity was still in beta. The issue gained close to a hundred 👍 over the years. I'm delighted to finally ship it.

## URL hash

Select slides with URLs with [`hash`](https://flickity.metafizzy.co/options.html#fullscreen). This works both ways: clicking on hash links like `<a href="#carousel-cell2">` will select matching the `#carousel-cell2` element, _and_ selecting a new slide will change the page URL to the selected cell's `id`. So you can share URLs to specific slides.

<blockquote class="twitter-video" data-lang="en"><p lang="en" dir="ltr">🆕 Flickity v2.1 hash. Select slides with URLs <a href="https://t.co/WmaHc0eTTp">https://t.co/WmaHc0eTTp</a> <a href="https://t.co/fFEP1FHOSD">pic.twitter.com/fFEP1FHOSD</a></p>&mdash; Metafizzy (@metafizzyco) <a href="https://twitter.com/metafizzyco/status/976096154676072449?ref_src=twsrc%5Etfw">March 20, 2018</a></blockquote>

Both `fullscreen` and `hash` are add-on features. They are maintained as separate projects outside of Flickity, so the Flickity source code doesn't get bloated with new features. You can choose to add these features by adding their scripts to your project. See [flickity-fullscreen](https://github.com/metafizzy/flickity-fullscreen) and [flickity-hash](https://github.com/metafizzy/flickity-hash) on GitHub. 

## lazyLoad srcset

[Lazy-load images with `srcset`](https://flickity.metafizzy.co/options.html#lazyload) by setting the `data-flickity-lazyload-srcset` attribute. You can also set `data-flickity-lazyload-src` as well to set `src` as a fallback.

``` html
<img data-flickity-lazyload-srcset="
    walrus-large.jpg 720w,
    walrus-med.jpg 360w"
  sizes="(min-width: 1024px) 720px, 360px"
  data-flickity-lazyload-src="walrus-large.jpg"
  />
```

<blockquote class="twitter-video" data-lang="en"><p lang="cs" dir="ltr">🆕 Flickity v2.1 lazyLoad srcset <a href="https://t.co/NWBUIlZhzn">https://t.co/NWBUIlZhzn</a> <a href="https://t.co/RwFkOcujun">pic.twitter.com/RwFkOcujun</a></p>&mdash; Metafizzy (@metafizzyco) <a href="https://twitter.com/metafizzyco/status/976823372058374145?ref_src=twsrc%5Etfw">March 22, 2018</a></blockquote>

## change event

Flickity's `select` event is triggered any time a slide is selected. But it will trigger even if the same slide is selected. Flickity v2.1 now has the [`change` event](https://flickity.metafizzy.co/events.html#change), which will only be triggered when the selected slide has changed.

``` js
$carousel.on( 'change.flickity', function( event, index ) {
  console.log( 'Slide changed to ' + index )
});
```

## And more!

+ Added [`draggable: '>1'`](https://flickity.metafizzy.co/options.html#draggable) option setting (now default) to disable dragging if only one slide.
+ Added [`ready` event](https://flickity.metafizzy.co/events.html#change). Added `on` option to capture initial events.
+ Enabled [`staticClick` event](https://flickity.metafizzy.co/events.html#staticclick) when not draggable.
+ Bug fixes with `prepend`, `remove`, and `wrapAround`.

[Read the v2.1.0 release notes for details.](https://github.com/metafizzy/flickity/releases/tag/v2.1.0)

With these features, Flickity is now perfect... Naw. You can continue to help me select new features by looking over [requested features on the GitHub issue tracker](https://github.com/metafizzy/flickity/labels/feature%20request) and adding your 👍 reaction.

<script async src="https://platform.twitter.com/widgets.js"></script>
