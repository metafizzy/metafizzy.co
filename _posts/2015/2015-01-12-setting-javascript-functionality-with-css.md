---

title: Setting JavaScript functionality with&nbsp;CSS
category: blog
layout: blog

---

One of [Slick](kenwheeler.github.io/slick/)'s hotter feature request is to [disable Slick functionality at certain CSS breakpoints](https://github.com/kenwheeler/slick/issues/542). This touches at a tricky issue: setting JavaScript functionality with CSS. Imagine this CSS pseudo-code:

{% highlight css %}
/* default css, small devices like phones, less than 768px */

/* JS widget is enabled by default */

@media screen and ( min-width: 768px ) {
  /* larger devices: tablets and up */
  
  /* JS widget is now disabled */
}
{% endhighlight %}

Slick has an awesome feature where you can set variations of options for various breakpoints.

{% highlight css %}
$('.responsive').slick({
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }
  ]
});
{% endhighlight %}

But this approach comes with issues. It works by setting style information in JavaScript, when it should be kept in CSS. Also, [JavaScript can mis-interpret the window width](https://github.com/kenwheeler/slick/issues/560), causing a mismatch between the breakpoint used in JavaScript versus CSS.

## Isotope element sizing

With Isotope, I tried a technique to set options via the state of CSS. You can set the [`columnWidth`](http://isotope.metafizzy.co/layout-modes/masonry.html#columnwidth) by pointing to [the size of a dummy element](http://isotope.metafizzy.co/options.html#element-sizing).

{% highlight html %}
<div class="container">
  <!-- dummy element for size of columnWidth -->
  <div class="grid-sizer"></div>
  <div class="item"></div>
  <div class="item"></div>
  ...
</div>
{% endhighlight %}

{% highlight css %}
/* default, 3 columns */
.grid-sizer, .item { width: 33.333%; }

@media screen and ( min-width: 768px ) {
  /* larger devices, 5 columns */
  .grid-sizer, .item { width: 20%; }
}
{% endhighlight %}

{% highlight js %}
$('.container').isotope({
  itemSelector: '.item',
  masonry: {
    // set columnWidth by width of .grid-sizer
    columnWidth: '.grid-sizer'
  }
});
{% endhighlight %}

<p data-height="356" data-theme-id="0" data-slug-hash="BypgYq" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/BypgYq/'>Isotope - element sizing columnWidth</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

This technique requires an extra element be added to the HTML, but it allows the styles to be kept in CSS. So if the user changes the breakpoint or the size of the columns, they only need to change it in one place.

## Activating Flickity with conditional CSS

Back to the first problem: How can the widget be enabled or disabled with CSS? I could use a dummy element, like with Isotope, but I'd rather not require extra markup if it's not necessary.

I like Jeremy Keith's [Conditional CSS technique](https://adactio.com/journal/5429). It works by reading the `content` of a pseudo-element `:after`.

{% highlight css %}
@media all and (min-width: 45em) {
  body:after {
    content: 'widescreen';
    display: none;
  }
}
{% endhighlight %}

{% highlight js %}
var size = getComputedStyle( document.body,':after' ).content;
if ( size.indexOf('widescreen') !=-1 ) {
    // do widescreen stuff
}
{% endhighlight %}

Try resizing the window on [this CodePen to see this technique in effect](http://codepen.io/desandro/pen/emgwPJ).

This technique has been built into [Flickity](https://github.com/metafizzy/flickity). I've added a `watch` option. It looks for `:after` content of its container element to be `flickity`. If so, Flickity is enabled. If not, Flickity is disabled.

<p data-height="351" data-theme-id="0" data-slug-hash="OPWKPG" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/OPWKPG/'>Flickity watch option</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

Technically, Flickity is always 'on'. But when inactive, its only functionality is to watch and see if it should activate. I added extra logic so that Flickity can activate and deactivate itself (rather than destroy/create) so it can re-use the same instance and UI elements.

## Fallbacks

This technique is not without its own challenges. It doesn't work in IE8, Android 2.3, and [previous versions of Chrome](https://code.google.com/p/chromium/issues/detail?id=236603). My current solution is to run a feature test if reading the `:after` content will work. If not, the user can set `watch: 'fallbackOn'` to enableFlickity in these cases, or stick with `watch: true` to disable them. There's also a possible collision with how [`.clearfix` uses `:after`](https://github.com/h5bp/html5-boilerplate/blob/v4.3.0/css/main.css#L199). After Flickity has been released and I get more input, this feature is likely to be revisited.

## Previously

If you're just joining us, I'm making a new gallery library! The story thus far...

+ [Initial demos](/blog/initial-demos)
+ [Math time: Resting position](/blog/math-time-resting-position/)
+ [Particle to slider](/blog/particle-to-slider/)
+ [Flickity begins](/blog/flickity-begins/)
+ [Making SVG buttons](/blog/making-svg-buttons/)
+ [The best time](/blog/the-best-time/)

[Flickity is up on GitHub](https://github.com/metafizzy/flickity). Follow along development!

<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
