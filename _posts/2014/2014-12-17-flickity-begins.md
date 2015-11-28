---

title: Flickity begins
category: blog
layout: blog

---

The initial demos used `<canvas>` to draw simple shapes on a screen. I was able to test out ideas and get a better feel for the user interaction. Now I'm ready to start developing the actual library.

I need a name. For now, let's go with _Flickity_.

I have a head start as I'm building on the experience of developing other libraries, like [Isotope](http://isotope.metafizzy.co), [Packery](http://packery.metafizzy.co), and [Draggabilly](http://draggabilly.desandro.com). They all have the same basic structure.

``` js
// initialize new Flickity instance
var element = document.querySelector('#gallery')
var flickity = new Flickity( element, {
  // options
})
```

The constructor has two parameters: `element`, the element that will hold the gallery and its cells; and `options`, and object with options. The `Flickity` constructor method takes care of these two parameters.

``` js
// Flickity constructor
function Flickity( element, options ) {
  // use element as selector string
  // so users can set `new Flickity('#container')`
  if ( typeof element === 'string' ) {
    element = document.querySelector( element );
  }
  this.element = element;
  // options, first set options from defaults
  this.options = U.extend( {}, this.constructor.defaults );
  // then overwrite with user-set options
  this.option( options );
  // kick things off
  this._create();
}

// default options
Flickity.defaults = {
  friction: 0.2
};

Flickity.prototype.option = function( opts ) {
  U.extend( this.options, opts );
};
```

With this generic setup, all the specialized functionality will go into the `Flickity.prototype` methods.

I am able to build a slide-able gallery by copy/pasting plenty of code from the other libraries and initial `<canvas>` demos. Isotope and Packery work with a container elements and a set of item elements. Flickity has a similar concept with its gallery element and set of cell elements. Draggabilly works with mouse/touch events to make elements draggable. Flickity uses much of the same code to make the gallery draggable.

<p data-height="268" data-theme-id="0" data-slug-hash="RNRpjo" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/RNRpjo/'>Flickity begins 1 - slider</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

From there, the remaining physics logic was copy/pasted over and converted for the library.

<p data-height="268" data-theme-id="0" data-slug-hash="KwMWyB" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/KwMWyB/'>Flickity begins 2 - selected cell physics</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

---

Writing code comes in two phases. First is expansion: writing whatever code will get the job done; bringing ideas to life on the screen. Second is refactoring: going back to revise and edit after a concept has been realized. It's useful to be distinct about these two phases and not try to do both at the same time. Ideas and creativity should run uninhibited. Likewise, refactoring works better when an idea has been fully executed. _Write drunk, edit sober._ Something like that.

---

This initial version is fairly naïve, but it has the basic feature set that will be the foundation of the super-library to come.

+ Create slider element
+ Get cell elements
+ Position cell elements
+ Listen to touch/mouse events
+ Position slider with dragging and post-drag physics

Everything from here on out will be small details: adding optional features, additional UI, and resolving edge cases.

---

[Flickity is now up on GitHub](https://github.com/metafizzy/flickity). It's nowhere near ready for proper use, but you can follow along development as a consolation.

As I write more about the development process, I'm realizing that I could be skipping over some big steps. (For example, there's a big portion of the code that deals with this `Unipointer` library.) If there's something you're curious about, please ping me [@metafizzyco](https://twitter.com/metafizzyco). I'm happy to dive deeper :)

## Previously

If you're just joining us, I'm making a new gallery library! The story thus far...

+ [Initial demos](/blog/initial-demos)
+ [Math time: Resting position](/blog/math-time-resting-position/)
+ [Particle to slider](/blog/particle-to-slider/)

<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
