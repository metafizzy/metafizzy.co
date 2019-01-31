---
title: Fade with Flickity v2.2.0
image: /img/2019/flickity-fade-thumbnail.jpg
blurb: Flickity v2.2.0 is out with all-new feature fading between slides
---

Flickity v2.2.0 has been released with [all-new fade feature](https://flickity.metafizzy.co/options.html#fade). The `fade` option allows you to fade between transitioning slides instead of moving.

![Flickity fade](/img/2019/flickity-fade3.gif)

I built out this feature as [separate add-on package `flickity-fade`](https://github.com/metafizzy/flickity-fade). Read more about [Flickity's modular architecture here.](/blog/making-features-independent-with-internal-events/) Fade works with dragging, groupCells, wrapAround, imagesLoaded, and everything else in the Flickity feature-set.

To use `fade`, add `flickity-fade.css` to your stylesheets, `flickity-fade.js` to your scripts, and then enable `fade` in your Flickity options.

``` js
$('.carousel').flickity({
  fade: true,
});
```

[Flickity fade was four years in the making.](https://github.com/metafizzy/flickity/issues/26) I held off for so long because dragging & moving is both obvious and what makes Flickity special. But after 4 years of requests, I relented. Lords of UX, forgive me.

---

Flickity v2.2.0 also comes with other smaller features and bug fixes:

+ Set the initial selected cell that matches a selector string with [`initialIndex: '.selector'`](https://flickity.metafizzy.co/options.html#initialindex)
+ Better accessibility support with `aria-hidden`
+ The `tap-listener` package was removed as a dependency, shedding some code weight
+ Fixed triggering events after `destroy`
+ Fixed iOS 9 dragging bug

Most of these improvements originated from open-source contributions. [View the v2.2.0 release notes](https://github.com/metafizzy/flickity/releases/tag/v2.2.0) for the original GitHub issues and Pull Requests.

---

[Flickity turns 4 years old next month.](/blog/flickity-v1-released/) It's been great to see Flickity continue to grow and be used out in the wild. Fading was definitely not my cup of tea, but I was convinced to pursue it after witnessing sustained interest over years. People didn't just want fading, [they wanted all of Flickity's features _plus_ fading](https://github.com/metafizzy/flickity/issues/26#issuecomment-432851769). My heart swells.
