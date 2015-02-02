---

title: Making features independent with internal&nbsp;events
category: blog
layout: blog

---

[Flickity](http://flickity.metafizzy.co) is not lightweight. `flickity.pkgd.js` is currently 5000 lines of code weighing 132 kb. That's about half the size of jQuery. Having a larger file size is not necessarily a bad thing. Using the compressed `flickity.pkgd.min.js`, the file size is equivalent to a small image — nothing to worry about. What did concern me was how Flickity had grown to become a monolith.

Although I was [breaking up code into logical sections and features](/blog/lots-of-files/), these features were hard-coded together. For example, activating page dots and previous/next buttons was handled [within `Flickity.prototype.activate()`](https://github.com/metafizzy/flickity/blob/v0.1.0/js/flickity.js#L202-L211).

{% highlight js %}
Flickity.prototype.activate = function() {
  // ...
  // activate prev/next buttons, page dots
  if ( this.prevButton ) {
    this.prevButton.activate();
  }
  if ( this.nextButton ) {
    this.nextButton.activate();
  }
  if ( this.pageDots ) {
    this.pageDots.activate();
  }
}
{% endhighlight %}

[`Flickity.prototype.pointerDown()`](https://github.com/metafizzy/flickity/blob/v0.1.0/js/drag.js#L105) made a direct call to `this.player`.

{% highlight js %}
Flickity.prototype.pointerDown = function() {
  // ...
  // stop auto play
  this.player.stop();
};
{% endhighlight %}

Everything was interconnected. If you wanted to use Flickity, you would need to use all its parts.

![Flickity dependency chart](http://i.imgur.com/o8gyxW4.png)

Ideally, Flickity could be structured in a way that features could be completely optional. If you didn't want to use page dots or `autoPlay`, you wouldn't have to include its `.js` source. While these features are related, they are not dependent on one another. They could be separated and made independent. To maintain functionality between features, Flickity could use its own events.

## EventEmitter

I use [Wolfy87/EventEmitter](https://github.com/Wolfy87/EventEmitter) for event handling in all my libraries ([Flickity](http://flickity.metafizzy.co), [Isotope](http://isotope.metafizzy.co), [Draggabilly](http://draggabilly.desandro.com), [imagesLoaded](http://imagesloaded.desandro.com)). EventEmitter was developed as a browser-port of [node's EventEmitter class](http://nodejs.org/api/events.html#events_class_events_eventemitter). It emits evens with `.emit()` or `.emitEvent()`, and binds events with `.on()`, `.off()`, and `.once()`.

{% highlight js %}
function Library() {}
// inherit EventEmitter methods
Library.prototype = new EventEmitter();

var lib = new Library();
lib.on( 'tacoTuesday', function( message, hours ) {
  console.log( 'REJOICE! TT ' + message + ' for ' + hours + ' hours' );
});
lib.emit( 'tacoTuesday', 'gonna be chill', 4 );
// -> logs 'REJOICE! TT gonna be chill for 4 hours'
{% endhighlight %}

With EventEmitter, I have a proper API for [pub-sub](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern).

## Internal events

You might typically think of events as hooks that are used by developers and third-party libraries to build on top of a library. For example, [Bootstrap's carousel triggers `slide`](http://getbootstrap.com/javascript/#carousel-events).

{% highlight js %}
$('#myCarousel').on( 'slide', function () {
  console.log('carousel slide happening')
})
{% endhighlight %}

Events can also be used internally within the library. Within Flickity, I was already using events across features. Previous/next buttons and page dots were being updated by listening to the `select` event.

{% highlight js %}
Flickity.prototype.select = function( index ) {
  // ...
  this.selectedIndex = index;
  // emit select event
  this.emit('select');
};

PrevNextButton.prototype._create = function() {
  // ...
  // update on select event
  var _this = this;
  this.parent.on( 'select', function() {
    _this.update();
  });
};
{% endhighlight %}

I used this same concept to replace all hard-coded features with events. For example, [in `Flickity.prototype.activate()`](https://github.com/metafizzy/flickity/blob/70cf18a7eb/js/flickity.js#L192), I removed checking for features like `this.prevButton`, and replaced it with emitting the `activate` event.

{% highlight js %}
Flickity.prototype.activate = function() {
  // ...
  this.emit('activate');
};
{% endhighlight %}

I moved the previous/next button activation logic into `prev-next-button.js`. This file adds [necessary methods to `Flickity.prototype`](https://github.com/metafizzy/flickity/blob/70cf18a7eb/js/prev-next-button.js#L198) that are specific to the previous/next buttons.

{% highlight js %}
Flickity.createMethods.push('_createPrevNextButtons');

Flickity.prototype._createPrevNextButtons = function() {
  if ( !this.options.prevNextButtons ) {
    return;
  }
  // create buttons
  this.prevButton = new PrevNextButton( -1, this );
  this.nextButton = new PrevNextButton( 1, this );
  // listen to activate
  this.on( 'activate', this.activatePrevNextButtons );
};

Flickity.prototype.activatePrevNextButtons = function() {
  this.prevButton.activate();
  this.nextButton.activate();
};
{% endhighlight %}

Instead of `Flickity.prototype.pointerDown()` calling `this.player.stop()`, the `Player` class [listens to the `pointerDown` event](https://github.com/metafizzy/flickity/blob/70cf18a7eb/js/player.js#L141).

{% highlight js %}
Flickity.createMethods.push('_createPlayer');

Flickity.prototype._createPlayer = function() {
  this.player = new Player( this );
  // ...
  this.on( 'pointerDown', this.stopPlayer );
};

Flickity.prototype.stopPlayer = function() {
  this.player.stop();
};
{% endhighlight %}

There's some extra glue required to put this together. Feature-specific `Flickity.prototype` methods need to be triggered on creation. Events need to be bound before they are emitted. To handle this, within `Flickity.prototype.create()`, each method in [`Flickity.createMethods` gets triggered](https://github.com/metafizzy/flickity/blob/70cf18a7eb/js/flickity.js#L143-L146).

{% highlight js %}
// flickity.js
Flickity.prototype._create = function() {
  // ...
  // trigger each method within createMethods
  for ( var i=0, len = Flickity.createMethods.length; i < len; i++ ) {
    var method = Flickity.createMethods[i];
    this[ method ]();
  }
};
{% endhighlight %}

Features can then register their create methods:

{% highlight js %}
// feature.js
Flickity.createMethods.push('_createFeature');

Flickity.prototype._createFeature = function() {
  // do feature-specific creation and event binding
};
{% endhighlight %}

A feature's code exists only in that feature's `.js` file, and not sprinkled through out the project.

The result is that the dependencies are reversed. Instead of Flickity requiring each feature to be in place, features are dependent on the core of Flickity. Features can be added or removed independently of one another.

![Flickity dependency chart](http://i.imgur.com/zcVp9EO.png)

You could even build a Flickity gallery with no dragging or no UI, with just the core API as its interface.

<p data-height="337" data-theme-id="0" data-slug-hash="RNLpqj" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/RNLpqj/'>Flickity - no drag, no UI, API only</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Even though it increases Flickity's total file size, this refactor makes me feel at ease. It provides file-size-snobs a way to build streamlined Flickity packages without any cruft. Flickity now has a extendable API that allows anyone to build add-on features that can be used on demand. This will be useful as more features get requested. Flickity's feature-set can grow without having to build into the core project.

## Previously

If you're just joining us, I'm making a new gallery library! The story thus far...

+ [Initial demos](/blog/initial-demos)
+ [Math time: Resting position](/blog/math-time-resting-position/)
+ [Particle to slider](/blog/particle-to-slider/)
+ [Flickity begins](/blog/flickity-begins/)
+ [Making SVG buttons](/blog/making-svg-buttons/)
+ [The best time](/blog/the-best-time/)
+ [Setting JavaScript functionality with CSS](/blog/setting-javascript-functionality-with-css/)
+ [Front-end testing with QUnit](/blog/front-end-testing-qunit/)
+ [Flickity beta testing](/blog/flickity-beta-testing/)
+ [Lots of files, but only one in my head](/blog/lots-of-files/)

[Flickity beta is out](http://flickity.metafizzy.co/). Give 'er a flick!
