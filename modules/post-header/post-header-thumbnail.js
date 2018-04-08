// lazy load .post-header__thumbnail
( function() {

var lazyElems = document.querySelectorAll('.post-header__thumbnail[data-lazy]');

if ( !lazyElems || !lazyElems.length )  {
  return;
}

// -------------------------- init -------------------------- //

// events
var onThrottledScroll = throttle( checkLazies, 200 );
var onDebouncedResize = debounce( onResize );

var lazyThumbs = [];

var winHeight = window.innerHeight;

for ( var i=0; i < lazyElems.length; i++ ) {
  var elem = lazyElems[i];
  var lazyThumb = new LazyThumb( elem );
  lazyThumbs.push( lazyThumb );
}

// init async for other stuff to be setup
setTimeout( function init() {
  updateLaziesPositions();
  checkLazies();
  window.addEventListener( 'scroll', onThrottledScroll );
  window.addEventListener( 'resize', onDebouncedResize );
});

// -------------------------- complete -------------------------- //

function done() {
  window.removeEventListener( 'scroll', onThrottledScroll );
  window.removeEventListener( 'resize', onDebouncedResize );
}

// -------------------------- throttle & debounce -------------------------- //

function throttle( fn, delay ) {
  var wait = false;
  delay = delay || 100;
  return function () {
    if ( wait ) {
      return;
    }
    fn();
    wait = true;
    setTimeout( function() {
      wait = false;
      fn();
    }, delay );
  };
}

function debounce( fn, threshold ) {
  var timeout;
  threshold = threshold || 100;
  return function debounced() {
    clearTimeout( timeout );
    timeout = setTimeout( fn, threshold );
  };
}

// -------------------------- controller functions -------------------------- //

function checkLazies() {
  // stop listening if no more to load
  if ( !lazyThumbs.length ) {
    done();
    return;
  }

  // check lazy loaders
  // console.log('scroll', lazyThumbs.length );
  lazyThumbs.filter( function( lazyThumb ) {
    lazyThumb.check();
    // only keep loaders that are still lazy
    return lazyThumb.isLazy;
  });
}

function updateLaziesPositions() {
  lazyThumbs.forEach( function( lazyThumb ) {
    lazyThumb.updatePosition();
  });
}

function onResize() {
  winHeight = window.innerHeight;
  updateLaziesPositions();
  checkLazies();
}

// -------------------------- LazyThumb -------------------------- //

function LazyThumb( element ) {
  this.element = element;
  this.isLazy = true;
}

LazyThumb.prototype.updatePosition = function() {
  var rect = this.element.getBoundingClientRect();
  this.top = rect.top + window.scrollY;
  this.bottom = this.top + this.element.offsetHeight;
};

LazyThumb.prototype.check = function() {
  var scrollY = window.scrollY;
  var activeTop = scrollY - winHeight * 1.5;
  var activeBottom = scrollY + winHeight * 3;
  var isInOverlap = this.top < activeBottom && this.bottom > activeTop;
  if ( isInOverlap ) {
    this.load();
  }
};

LazyThumb.prototype.load = function() {
  if ( !this.isLazy ) {
    return;
  }
  var url = this.element.getAttribute('data-lazy');
  this.element.style.backgroundImage = 'url(' +  url + ')';
  this.isLazy = false;
};

})();
