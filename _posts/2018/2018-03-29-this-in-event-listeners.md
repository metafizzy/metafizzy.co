---
title: 'What is `this` in event listeners?'
image: /img/metafizzy-logo-thumbnail-gold.png
blurb: 'Learn how to specify `this` in event listeners so you can use prototype classes with events in JavaScript.' 
---

[I was just asked](https://github.com/metafizzy/unipointer/issues/6):

> Hello desandro! I'm a new developer.
> 
> `elem.addEventListener( startEvent, this );`
> 
> I wonder what is `this` means. I'm confused. _[edited]_

Confusing, indeed! `this` in JavaScript is difficult to learn, and especially tricky to understand when used in event listeners.

Let's take a step back and look at a simplified example. Here is a demo for a mouse-draggable element.

``` js
var dragElem = document.querySelector('.draggable');

var x = 0;
var y = 0;
var dragStartX, dragStartY, pointerDownX, pointerDownY;

dragElem.addEventListener( 'mousedown', function( event ) {
  // keep track of start positions
  dragStartX = x;
  dragStartY = y;
  pointerDownX = event.pageX;
  pointerDownY = event.pageY;
  // add move & up events
  window.addEventListener( 'mousemove', onmousemove );
  window.addEventListener( 'mouseup', onmouseup );
});

function onmousemove( event ) {
  // how much has moved
  var moveX = event.pageX - pointerDownX;
  var moveY = event.pageY - pointerDownY;
  // add movement to position
  x = dragStartX + moveX;
  y = dragStartY + moveY;
  // position element
  dragElem.style.left = x + 'px';
  dragElem.style.top = y + 'px';
}

function onmouseup() {
  // remove move & up events
  window.removeEventListener( 'mousemove', onmousemove );
  window.removeEventListener( 'mouseup', onmouseup );
}
```

<p data-height="300" data-theme-id="dark" data-slug-hash="Zxrjqx" data-default-tab="result" data-user="desandro" data-embed-version="2" data-pen-title="Draggable, single element" class="codepen">See the Pen <a href="https://codepen.io/desandro/pen/Zxrjqx/">Draggable, single element</a> by Dave DeSandro (<a href="https://codepen.io/desandro">@desandro</a>) on <a href="https://codepen.io">CodePen</a>.</p>

To start dragging, I first add a `mousedown` event listener. When triggered, I then add listeners for `mousemove` and `mouseup`. In `onmousemove` is where I calculate and set the element's position. In `onmouseup`, I remove `mousemove` and `mouseup` listeners to stop dragging.

This works just fine for a single element. Metafizzy plugins are designed to handle multiple instances on the same page.

``` js
var dragElems = document.querySelectorAll('.draggable');
for ( var i=0; i < dragElems.length; i++ ) {
  var dragElem = dragElems[i];
  // now what?...
}
```

One way to approach this is to wrap up the draggable code [into its own big function and call that for each element](http://fizzy.school/un-repeat-with-functions). But I like to use classes with `prototype` to handle multiple instances of the same behavior.

``` js
// Dragger class
function Dragger( element ) {
  this.element = element;
  this.x = 0;
  this.y = 0;
  // doesn't work!
  this.element.addEventListener( 'mousedown', this.onmousedown );
}

Dragger.prototype.onmousedown = function( event ) {
  this.dragStartX = this.x;
  this.dragStartY = this.y;
  this.pointerDownX = event.pageX;
  this.pointerDownY = event.pageY;
  // doesn't work, again!
  window.addEventListener( 'mousemove', this.onmousemove );
  window.addEventListener( 'mouseup', this.onmouseup );
};
```

Now I need to add an event listener within the `Dragger` class functions. But there is a problem. I want to use `this` to reference the instance of the `Dragger` class within the event handler functions. But functions added with `addEventListener` will reference the bound element as `this`, not the function or object.

``` js
dragElem.addEventListener( 'mousedown', function() {
  console.log( this );
  // => Element
});
```

## handleEvent

One solution is to use  a little-known feature of browser JavaScript, [`handleEvent`](https://developer.mozilla.org/en-US/docs/Web/API/EventListener/handleEvent). An object with an `handleEvent` method will be triggered with when added with `addEventListener`. Within the `handleEvent` method, `this` will refer to the listener object, not the element.

``` js
var listener = {
  greeting: 'Hello ',
  handleEvent: function( event ) {
    console.log( this.greeting + event.type );
  },
};

dragElem.addEventListener( 'mousedown', listener );
// on mousedown...
// => 'Hello mousedown'
```

[See simple handleEvent demo on CodePen.](https://codepen.io/desandro/pen/vRdVej?editors=0011)

The `handleEvent` method can be used for multiple events. You can specify logic by using `event.type`.

``` js
var listener = {
  greeting: 'Hello ',
  handleEvent: function( event ) {
    console.log( this.greeting + event.type );
  },
};

dragElem.addEventListener( 'mousedown', listener );
dragElem.addEventListener( 'mousemove', listener );
dragElem.addEventListener( 'mouseup', listener );
// on mousedown => 'Hello mousedown'
// on mousemove => 'Hello mousemove'
// on mouseup => 'Hello mouseup'
```

Back to the `Dragger` class. So now I add the `handleEvent` method to cooridate which event method to trigger. Then I can add `this` as the event listener.

``` js
// Dragger class
function Dragger( element ) {
  this.element = element;
  this.x = 0;
  this.y = 0;
  // add this as event listener, trigger handleEvent
  this.element.addEventListener( 'mousedown', this );
}

// trigger .ontype from event.type
// i.e. trigger onmousedown() from mousedown
Dragger.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  // call method if there
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

Dragger.prototype.onmousedown = function( event ) {
  this.dragStartX = this.x;
  this.dragStartY = this.y;
  this.pointerDownX = event.pageX;
  this.pointerDownY = event.pageY;
  // add this as event listener, trigger handleEvent
  window.addEventListener( 'mousemove', this );
  window.addEventListener( 'mouseup', this );
};
```

<p data-height="300" data-theme-id="dark" data-slug-hash="qoxyGG" data-default-tab="result" data-user="desandro" data-embed-version="2" data-pen-title="Draggable event listeners, handleEvent" class="codepen">See the Pen <a href="https://codepen.io/desandro/pen/03a6c3d5255b9f6765259617ee401f83/">Draggable event listeners, handleEvent</a> by Dave DeSandro (<a href="https://codepen.io/desandro">@desandro</a>) on <a href="https://codepen.io">CodePen</a>.</p>

So to the original question: `this` can be used as an event listener as it has a `handleEvent` method. That method then triggers other methods that match `event.type`, like `onmousedown`.

I learned the `handleEvent` technique back in 2010. I use it in all the Metafizzy plugins. But JavaScript has come a long way in that time.

## bind this

Instead of adding circuitry through `handleEvent`, you can [specify `this` with `.bind()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Specifying_this_using_bind().

> The `Function.prototype.bind()` method lets you specify the value that should be used as this for all calls to a given function.

Using `bind()` has an additional benefit in that you can add multiple event listeners for the same event name.

``` js
this.element.addEventListener( 'click',
  this.onElementClick.bind( this ) );

this.button.addEventListener( 'click',
  this.onButtonClick.bind( this ) );
```

But, because `bind()` returns a new function, you will need to keep track of that function if you want to remove it later.

``` js
this.handleElementClick = this.onElementClick.bind( this );
this.handleButtonClick = this.onButtonClick.bind( this );
// add event listener
this.element.addEventListener( 'click', this.handleElementClick );
this.button.addEventListener( 'click', this.handleButtonClick );
// remove event listener
this.element.removeEventListener( 'click', this.handleElementClick );
this.button.removeEventListener( 'click', this.handleButtonClick );
```

Here's what the `Dragger` class looks like using `bind()`.

``` js
function Dragger( element ) {
  this.element = element;
  this.x = 0;
  this.y = 0;
  // bind self for event handlers
  this.mousedownHandler = this.onmousedown.bind( this );
  this.mousemoveHandler = this.onmousemove.bind( this );
  this.mouseupHandler = this.onmouseup.bind( this );
  
  this.element.addEventListener( 'mousedown', this.mousedownHandler );
}

Dragger.prototype.onmousedown = function( event ) {
  this.dragStartX = this.x;
  this.dragStartY = this.y;
  this.pointerDownX = event.pageX;
  this.pointerDownY = event.pageY;

  window.addEventListener( 'mousemove', this.mousemoveHandler );
  window.addEventListener( 'mouseup', this.mouseupHandler );
};
```

<p data-height="300" data-theme-id="dark" data-slug-hash="303f7295ef3441fa95cc32af3af09ad6" data-default-tab="result" data-user="desandro" data-embed-version="2" data-pen-title="Draggable event listeners bind this" class="codepen">See the Pen <a href="https://codepen.io/desandro/pen/303f7295ef3441fa95cc32af3af09ad6/">Draggable bind this</a> by Dave DeSandro (<a href="https://codepen.io/desandro">@desandro</a>) on <a href="https://codepen.io">CodePen</a>.</p>

## Arrow functions

With the new ES6 hotness, you can specify [`this` using arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_separate_this). Within an arrow function, `this` will refer to the enclosing object.

``` js
function Dragger( element ) {
  this.element = element;
  this.x = 0;
  this.y = 0;

  // event listeners, with arrow functions
  this.onmousedown = ( event ) => {
    this.dragStartX = this.x;
    this.dragStartY = this.y;
    this.pointerDownX = event.pageX;
    this.pointerDownY = event.pageY;

    window.addEventListener( 'mousemove', this.onmousemove );
    window.addEventListener( 'mouseup', this.onmouseup );
  };

  this.onmousemove = ( event ) => {
    var moveX = event.pageX - this.pointerDownX;
    var moveY = event.pageY - this.pointerDownY;
    this.x = this.dragStartX + moveX;
    this.y = this.dragStartY + moveY;
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
  };

  this.onmouseup = () => {
    window.removeEventListener( 'mousemove', this.onmousemove );
    window.removeEventListener( 'mouseup', this.onmouseup );
  };
  
  // add event listener
  this.element.addEventListener( 'mousedown', this.onmousedown );
}
```

<p data-height="300" data-theme-id="dark" data-slug-hash="XEZyVE" data-default-tab="result" data-user="desandro" data-embed-version="2" data-pen-title="Draggable event listeners, arrow functions" class="codepen">See the Pen <a href="https://codepen.io/desandro/pen/XEZyVE/">Draggable event listeners, arrow functions</a> by Dave DeSandro (<a href="https://codepen.io/desandro">@desandro</a>) on <a href="https://codepen.io">CodePen</a>.</p>

Personally, I'm not a fan of the arrow function technique for this scenario. It puts the method code inside another function, rather than outside on `prototype`. But I'm including it for completeness.

Each technique has its own pros and cons. `handleEvent` has served me well over the years, but I'm finding that I run into event name conflicts with big plugins like [Flickity](https://flickity.metafizzy.co). So I'm starting to use out `bind()` a bit more. But then I miss the elegance of adding just `this` and not having to deal with extra event handler functions. Arrow functions, meanwhile, are just not for me.

<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

