---
title: Duck-punching the prototype
blurb: How to extend Metafizzy plugin behavior without altering original source code
image: /img/metafizzy-logo-thumbnail-blue.png
---

Every so often I encounter an issue with a Metafizzy plugin that I can't resolve its standard API. The only way to get it done is to overwrite core plugin code. These issues call for duck-punching. [Paul Irish's post on duck-punching jQuery](https://www.paulirish.com/2010/duck-punching-with-jquery/) is a great overview.

>  Duck-punching is another name for monkey patching. [Monkey patching](https://en.wikipedia.org/wiki/Monkey_patch) is a technique to “extend or modify the runtime code of dynamic languages without altering the original source code.”

Let's say you want to add a class `is-animating` to Flickity when it is animating. Flickity does not have a `startAnimation` event. But it does have a `startAnimation` method on its `prototype`. We can duck-punch that method to add our desired behavior.

``` js
// get original method
var startAnimation = Flickity.prototype.startAnimation;
// overwrite method
Flickity.prototype.startAnimation = function() {
  // call original method
  startAnimation.apply( this, arguments );
  // do new stuff
  this.element.classList.add('is-animating');
};
```

Let's break down what's happening here:

+ Store the original method as a variable.
+ Overwrite the method.
+ Within the new method, trigger the original behavior by calling the stored method with [`apply()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply). Pass in `this` and `arguments` to set instance and any arguments.
+ Add new behavior within the method.

Likewise, we can duck-punch the `_create` method to add an event listener on `settle` to remove the class.

``` js
// get original method
var _create = Flickity.prototype._create;
// overwrite method
Flickity.prototype._create = function() {
  // call original method
  _create.apply( this, arguments );
  // do new stuff
  this.on( 'settle', function() {
    this.element.classList.remove('is-animating');
  });
};
```

Here's a demo with these two duck-punches:

<p data-height="414" data-theme-id="dark" data-slug-hash="YadJLJ" data-default-tab="js,result" data-user="desandro" data-embed-version="2" data-pen-title="Fl ickity - duck punches" class="codepen"><a href="https://codepen.io/desandro/pen/YadJLJ/">View Flickity - duck punches CodePen</a></p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

By duck-punching `prototype` methods, we change the behavior of all Flickity instances. If you want to change behavior on individual instances, you can do so by duck-punching instance methods.

``` js
// create new instance
var flkty = new Flickity('.carousel');

// get original method
var startAnimation = flkty.startAnimation;
// overwrite method
flkty.startAnimation = function() {
  // call original method
  startAnimation.apply( this, arguments );
  // do new stuff
  console.log('start animation');
};
```

Duck-punching is a nice way to mess around with Metafizzy plugins without overhauling internal code. It's great for debugging, allowing you to shim in `console.log` like in the example above.

Duck-punching is one of those quirky features of JavaScript. At first it looks like a gross hack, but its usefulness makes it a thing of ugly beauty.
