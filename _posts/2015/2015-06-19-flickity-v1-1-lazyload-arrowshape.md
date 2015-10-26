---

title: "Flickity v1.1: lazyLoad and arrowShape"
category: blog
layout: blog

---

Flickity get its first minor release with v1.1. Just in time for summer with Metafizzy's [hottest requested feature](https://github.com/metafizzy/flickity/issues/14).

## lazyLoad

[lazyLoad](http://flickity.metafizzy.co/options.html#lazyload) works by loading images when a cell is selected.

``` html
<!-- set image's URL to load with data-flickity-lazyload -->
<img data-flickity-lazyload="full.jpg" />
```

Set `lazyLoad: true` in the Flickity options.

<p data-height="358" data-theme-id="0" data-slug-hash="GJMMEJ" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/GJMMEJ/'>Flickity - lazyLoad</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

Set `lazyLoad` to a number to load images in adjacent cells. `lazyLoad: 2` will load images in the selected cell, the next 2 cells and the previous 2 cells.

<p data-height="356" data-theme-id="0" data-slug-hash="rVGLGB" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/rVGLGB/'>Flickity - lazyLoad: 2 adjacent</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## arrowShape

Flickity v1.1 brings the new [`arrowShape` option](http://flickity.metafizzy.co/options.html#arrowshape). `arrowShape` allows you to set a custom shape for the arrow in the previous & next buttons. This is a neat little feature — it doesn't do much, but it's fun to play around with. I even created a WYSIWYG so you can drag around the shape points.

<iframe src="https://vid.me/e/lUv4?loop=1&amp;muted=1" width="474" height="440" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen scrolling="no"></iframe>

<p data-height="360" data-theme-id="0" data-slug-hash="vOeKpJ" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/vOeKpJ/'>Flickity - arrowShape</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## 40%-off sale

With the new release, [Commercial Licenses are on sale **40% off**](http://flickity.metafizzy.co/#commercial-license)! Save $10, $45, or up to $115 on a license during the sale this week.

Now is a great time to try Flickity. Get to it!

<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
