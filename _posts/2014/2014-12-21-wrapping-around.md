---

title: Wrapping around Flickity for infinite looping
category: blog
layout: blog

---

Sliders like [Jssor](http://www.jssor.com/) and [Slick](http://kenwheeler.github.io/slick/) have the ability to wrap around their cells, making an infinite loop. Users can keep progressing through the gallery without hitting an end. While I'm not sure if this is a good UI pattern (an infinite loop could be disorienting), I imagine that this is a nice feature that people will ask for.

---

Here's a simple slider you can drag left and right.

<p data-height="192" data-theme-id="0" data-slug-hash="emzoZj" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/emzoZj/'>Wrap around demo 1</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

For this demo, there are only three cells. After cell #3, the next cell should be cell #1. One way to resolve this is to move cell #1 to the end of cell #3 when it's about to be shown. This could work, but it would require moving around all the cells and keeping track of where they are.

Another way is to clone cells so there's overlap to work with. Both Jssor and Slick use this technique.

<p data-height="192" data-theme-id="0" data-slug-hash="zxBXqM" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/zxBXqM/'>Wrap around demo 2</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

Now the slider can be repositioned when the overlap is visible. The slider position needs to be kept between `cellWidth` and `-sliderWidth + cellWidth`, or 0 and `sliderWidth` if you subtract `cellWidth`. This math makes use of the remainder operator `%`.

{% highlight js %}
var modNum = ( ( num % max ) + max ) % max
{% endhighlight %}

I've come to learn that is is a [modulo operation](http://en.wikipedia.org/wiki/Modulo_operation), which [JavaScript lacks](http://javascript.about.com/od/problemsolving/a/modulobug.htm). This is a useful operation you might see used when calculating an angle, to keep it between 0 and 360.

{% highlight js %}
// keep angle between 0 and 360
angle = ( ( angle % 360 ) + 360 ) % 360
{% endhighlight %}

The tracked position can move outside these bounds, but when it is applied to the rendered position of the slider, then it is wrapped.

<p data-height="229" data-theme-id="0" data-slug-hash="jErRqG" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/jErRqG/'>Wrap around demo 3</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

There's a lot more going on with Flickity — calculating selected cells and applying forces. But the same principle applies. Try flicking all the way around this demo.

<p data-height="263" data-theme-id="0" data-slug-hash="jErRaz" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/jErRaz/'>Flickity - wrap around</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## Previously

If you're just joining us, I'm making a new gallery library! The story thus far...

+ [Initial demos](/blog/initial-demos)
+ [Math time: Resting position](/blog/math-time-resting-position/)
+ [Particle to slider](/blog/particle-to-slider/)
+ [Flickity begins](/blog/flickity-begins/)
+ [Making SVG buttons](/blog/making-svg-buttons/)

[Flickity is up on GitHub](https://github.com/metafizzy/flickity). Follow along development!

<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
