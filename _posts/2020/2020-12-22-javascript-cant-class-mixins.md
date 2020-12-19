---
title: Can't mix-in ES6 class expressions
---

Here's a quick JavaScript bug story. I'm working on [Infinite Scroll](https://infinite-scroll) v4, updating older ES5 code to ES2018.

If you create a class using the traditional `function` class definition, you can use mix it in to another class' prototype with `Object.assign()`. I use this pattern with <a href="https://github.com/metafizzy/ev-emitter">EvEmitter</a> and my plugins.

``` js
// function class definition
function EvEmitter() {}

// prototype methods
EvEmitter.prototype.emit = function() {};
EvEmitter.prototype.on = function() {};
EvEmitter.prototype.off = function() {};

// plugin function class
function InfiniteScroll() {}

// mixin EvEmitter prototype into Infinite Scroll
Object.assign( InfiniteScroll.prototype, EvEmitter.prototype );

// now InfiniteScroll can use EvEmitter methods
InfiniteScroll.prototype.create = function() {
  this.emit( 'load', function() {} );
  this.on( 'request', function() {} );
};
```

But, if you use ES6 classes expressions, you can no longer use the `Object.assign()` mix-in pattern.

``` js
// class expression
class EvEmitter {
  // prototype methods
  emit() {}
  on() {}
  off() {}
}

function InfiniteScroll() {}

// mixin
Object.assign( InfiniteScroll.prototype, EvEmitter.prototype );

InfiniteScroll.prototype.create = function() {
  // Uncaught TypeError: this.emit is not a function
  this.emit( 'load', function() {} );
  this.on( 'request', function() {} );
};
```

Whaaa? The core issue is that [class methods are non-enumerable](https://javascript.info/class#not-just-a-syntactic-sugar). If you try iterating over `Class.prototype` that was set with a class expression, you'll get nothing.

``` js
class EvEmitter {
  emit() {}
  on() {}
  off() {}
}

console.log( Object.keys( EvEmitter.prototype ) );
// => []
// empty!
```

I suppose this is an improvement

> That’s good, because if we for..in over an object, we usually don’t want its class methods.

Except I've been iterating over `prototype` for years. 

The obvious solution is to define the inherited class with a class expression as well, using `extend` to inherit the superclass.

``` js
// okay, this works
class InfiniteScroll extends EvEmitter {
  create() {
    this.emit( 'load', function() {} );
    this.on( 'request', function() {} );
  }
}
```

But it's a bummer that I _lose_ a feature by opting-in to the new syntax. `EvEmitter` really is a mix-in and I would like to be able to use it like one. [Read Angus Croll about why mixins are a good JavaScript pattern.](https://www.oreilly.com/library/view/beautiful-javascript/9781449371142/ch01.html). There is an [ES6 approach for mix-ins and class expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Mix-ins), but I'm not a fan.

So I reverted using `class` and switched back to the original function expression & `prototype` setting.

``` js
function EvEmitter() {}

EvEmitter.prototype.emit = function() {};
EvEmitter.prototype.on = function() {};
EvEmitter.prototype.off = function() {};
```

YAY back in business.
