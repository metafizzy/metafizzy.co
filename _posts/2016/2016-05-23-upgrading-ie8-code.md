---
title: Upgrading junky IE8 code with current goodies
---

Man, it feels good to cut out all the old junky code and live in the modern day. With new versions of [Isotope](/blog/isotope-v3-released/), [Packery](/blog/packery-v2-released/), [Masonry, and imagesLoaded](http://metafizzy.co/blog/masonry-v4-imagesloaded-v4-drop-ie8/), I've been upgrading browser support, dropping IE8 & 9, and Android <4. I've been able to remove hundreds of lines of code.

If you're looking to bump up your browser support, here's a run-down of all the code you can upgrade.

## Use standard browser properties


Use `addEventListener` for event binding, rather than a helper like [eventie](https://github.com/desandro/eventie).

``` js
// IE8
eventie.bind( element, 'click', function() {...});
```

``` js
// modern browsers
element.addEventListener( 'click', function() {...});
```

Use `classList` for changing classes, rather than a helper like [classie](https://github.com/desandro/classie).

```js
// IE8
classie.add( element, 'is-selected' );
```

``` js
// modern browsers
element.classList.add('is-selected');
```

Use `event.preventDefault()`.

``` js
// IE8
function onClick( event ) {
  if ( event.preventDefault ) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
}
```

``` js
// modern browsers
function onClick( event ) {
  event.preventDefault()
}
```

Use `window.pageYOffset` for scroll position.

``` js
// IE8
var isPageOffset = window.pageYOffset !== undefined;
var scrollX = isPageOffset ? window.pageXOffset : document.body.scrollLeft;
var scrollY = isPageOffset ? window.pageYOffset : document.body.scrollTop;
```

``` js
// modern browsers
window.pageXOffset;
window.pageYOffset;
```

Use standard `textContent` for setting text.

``` js
// IE8
var docElem = document.documentElement;
var textSetter = docElem.textContent !== undefined ? 'textContent' : 'innerText';

function setText( elem, value ) {
  elem[ textSetter ] = value;
}

setText( element, 'hello world' );
```

``` js
// modern browsers
element.textContent = 'hello world';
```

## CSS support

All browsers now support `transition` and `transform`. So I no longer need [get-style-property](https://github.com/desandro/get-style-property) to check vendor properties.

``` js
// IE8
// get vendor property for transform
var transformProp = getStyleProperty('transform');
// set position
if ( transformProp ) {
  // supports transform, set transform
  element.style[ transformProp ] = 'translate(40px, 30px)';
} else {
  // does not support transform, set left, top
  element.style.left = '40px';
  element.style.top = '30px';
}
```

Modern browsers support `transform` or `-webkit-transform`, so you don't have to check every vendor prefix.

``` js
// modern browsers
// get vendor property for transform
var docElemStyle = document.documentElement.style;
// either transform or WebkitTransform
var transformProp = typeof docElemStyle.transform == 'string' ?
  'transform' : 'WebkitTransform';
// supports transform, set transform
element.style[ transformProp ] = 'translate(40px, 30px)';
```

## New ES5 features

Dropping IE8 and Android 2.3 means you can natively use ES5 features. [There are a bunch of new ES5 features](http://speakingjs.com/es5/ch25.html), but here are the ones I have actually used.

`Array.isArray` to check if an object is an array.

``` js
// ES4
var objToString = Object.prototype.toString;
function isArray( obj ) {
  return objToString.call( obj ) == '[object Array]';
};

isArray( items );
```

``` js
// ES5
Array.isArray( items );
```

`Array.prototype.indexOf` to get the index of a value.

``` js
// ES4
function indexOf( ary, value ) {
  for ( var i=0; i < ary.length; i++ ) {
    if ( ary[i] === value ) {
      return i;
    }
  }
  return -1;
}

indexOf( items, value );
```

```js
// ES5
items.indexOf( value );
```

`Array.prototype.forEach` to iterate over an array.

```js
// ES4
for ( var i=0; i < items.length; i++ ) {
  var item = items[i];
  console.log( item );
}

```

``` js
// ES5
items.forEach( function( item ) {
  console.log( item );
});
```

`Array.prototype.filter` to create a new array by filtering values.

``` js
var numbers = [ 1, 2, 3, 4, 5, 6 ];

// ES4
var evens = [];
for ( var i=0; i < numbers.length; i++ ) {
  var number = numbers[i];
  if ( number % 2 === 0 ) {
    evens.push( number )
  }
}
```

``` js
// ES5
var evens = numbers.filter( function( number ){
  return number % 2 === 0;
});
```

`Array.prototype.map` to create a new array by changing values.

``` js
// ES4
var doubles = [];
for ( var i=0; i < numbers.length; i++ ) {
  var number = numbers[i];
  doubles.push( number * 2 );
}
```

``` js
// ES5
var doubles = numbers.map( function( number ) {
  return number * 2;
});
```

`Object.create` for prototypal inheritance. 

``` js
function Animal() {
  console.log('I am an animal!')
}

// ES4
Dog.prototype = new Animal();
// constructor function is triggered
// logs 'I am an animal!'
// also, weird syntax
```

``` js
// ES5
Dog.prototype = Object.create( Animal.prototype )
// constructor function not triggered, no console log
```

And there's more to play with. I've experimented with [custom Object getters and setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#Defining_getters_and_setters). These are powerful concepts, but may take some getting used to.

---

You may have looked twice. ES _Five_? Isn't ES6 the new hotness?

Metafizzy's libraries are designed to have a wide, diverse user-base. While forward-leaning developers may be itching to use ES6, they still have to step through scaffolding if they want to use it widespread in production. All the above code can be used right now in every browser worth using. No build processes. No transpilers. Straight up vanilla.
