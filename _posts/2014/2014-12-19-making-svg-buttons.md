---

title: Making SVG buttons
category: blog
layout: blog
published: false

---

Flickity needs buttons.

![Flickity needs buttons]()

They need to be:

+ Able to be positioned
+ Sized responsively
+ Styleable

For these reasons, I'm going with inline SVG. Images could work, but they add more file overhead to be managed. Icon font could work, but it's more files, plus they don't scale responsively with percentage width. CSS shapes could work, but they would require more code to handle size and positioning. Using SVG ticks all the checkboxes — although they are not supported by IE8 and Android 2.3, but I'll get to that.

## Inline SVG

Inline SVG is just markup. Most SVG examples have a bunch of attributes in `<svg>`, usually left overs from exporting out of Illustrator. Take the [inline SVG example](http://codepen.io/chriscoyier/pen/evcBu) from [CSS Tricks' Using SVG](http://css-tricks.com/using-svg/)
  
{% highlight html %}
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="612px" height="502.174px" viewBox="0 65.326 612 502.174" enable-background="new 0 65.326 612 502.174"
   xml:space="preserve" class="logo">
{% endhighlight %}

Turns out, [a lot of these attributes can be removed](http://stackoverflow.com/a/18468348/182183). `version` is not necessary. Inline SVG does not require `xmlns`. [`x="0"` & `y="0"` are default values](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/x). I managed to whittle away every attribute except for `viewBox`.

{% highlight html %}
<svg viewbox="0 0 100 100">
  <!-- The arrow shape is simple enough that the path is hand coded -->
  <path class="arrow" d="M 50,0 L 60,10 L 20,50 L 60,90 L 50,100 L 0,50 Z" />
</svg>
{% endhighlight %}

<p data-height="286" data-theme-id="0" data-slug-hash="gbMjVP" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/gbMjVP/'>inline SVG</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

Bonus, `<svg>` elements are responsive size ready, as they fill the width of their containers when `width` is not set.

## Creating SVG with JavaScript

For the library, the SVG will be created with JavaScript. This way, users don't have to be concerned with adding its complex markup. Creating inline SVGs is similar to creating elements on a page. Note that you have to use `createElementNS` instead of `createElement`, and that [it requires a URI](https://developer.mozilla.org/en-US/docs/Web/API/document.createElementNS) as its first argument.

{% highlight html %}
// create svg
var svgURI = 'http://www.w3.org/2000/svg';
var svg = document.createElementNS( svgURI, 'svg' );
// SVG attibutes, like viewBox, are camelCased. That threw me for a loop
svg.setAttribute( 'viewBox', '0 0 100 100' );
// create arrow
var path = document.createElementNS( svgURI, 'path' );
path.setAttribute( 'd', 'M 50,0 L 60,10 L 20,50 L 60,90 L 50,100 L 0,50 Z' );
// add class so it can be styled with CSS
path.setAttribute( 'class', 'arrow' );
svg.appendChild( path );
// add svg to page
element.appendChild( svg );
{% endhighlight %}

<p data-height="292" data-theme-id="0" data-slug-hash="azZayr" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/azZayr/'>SVG created with JS</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>



<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
