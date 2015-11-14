---

title: imagesLoaded gets backgrounds
category: blog
layout: blog

---

imagesLoaded now [supports background images](http://imagesloaded.desandro.com/#background), finally.

Set `{ background: true }` to detect when the element's background image has loaded.

{% highlight javascript %}
// jQuery
$('#container').imagesLoaded( { background: true }, function() {
  console.log('#container background image loaded');
});

// vanilla JS
imagesLoaded( '#container', { background: true }, function() {
  console.log('#container background image loaded');
});
{% endhighlight %}

<p data-height="268" data-theme-id="0" data-slug-hash="pjVMPB" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/pjVMPB/'>imagesLoaded - background</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Checking when images are loaded is a black magic. There are all sorts of quirks involved with how browsers load and display images. Cached images do not trigger a `load` event. Sometimes the `load` event is triggered before the image displays. Consequently, developing imagesLoaded is done with a fair amount of trepidation. With every fix and featured added, I worry two more issues will spring up in their place. That's why adding [background images as a feature took over three years](https://github.com/desandro/imagesloaded/issues/29). 

[imagesLoaded v3.2.0](https://github.com/desandro/imagesloaded/releases/tag/v3.2.0) includes other improvements:

+ Removed the internal buggy `cache`
+ Address Firefox bugs
+ Added `.makeJQueryPlugin()` for better compatibility with jQuery and Browserify/RequireJS/Webpack

[imagesLoaded is the 58th most popular library on Libscore](http://libscore.com/#libs), used on over 30,000 sites. Seeing this stat made me realize that it is just more than a pet project — it is a public utility. imagesLoaded should work for everyone, not solely my own endeavors. Now with backgrounds, imagesLoaded can help more developers.
