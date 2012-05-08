/**
 * metafizzy.co scripts
**/

/*jshint asi: false, browser: true, curly: true, eqeqeq: true, forin: false, newcap: true, noempty: true, strict: false, undef: true */
/*global Modernizr: false, Element: false */

/**
 * requestAnimationFrame polyfill by Erik Möller & Paul Irish et. al.
 * https://gist.github.com/1866474
 *
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
**/

(function( window ) {

  'use strict';

  var lastTime = 0;
  var prefixes = 'webkit moz ms o'.split(' ');
  // get unprefixed rAF and cAF, if present
  var requestAnimationFrame = window.requestAnimationFrame;
  var cancelAnimationFrame = window.cancelAnimationFrame;
  // loop through vendor prefixes and get prefixed rAF and cAF
  var prefix;
  for( var i = 0; i < prefixes.length; i++ ) {
    if ( requestAnimationFrame && cancelAnimationFrame ) {
      break;
    }
    prefix = prefixes[i];
    requestAnimationFrame = requestAnimationFrame || window[ prefix + 'RequestAnimationFrame' ];
    cancelAnimationFrame  = cancelAnimationFrame  || window[ prefix + 'CancelAnimationFrame' ] ||
                              window[ prefix + 'CancelRequestAnimationFrame' ];
  }

  // fallback to setTimeout and clearTimeout if either request/cancel is not supported
  if ( !requestAnimationFrame || !cancelAnimationFrame ) {
    requestAnimationFrame = function( callback, element ) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
      var id = window.setTimeout( function() {
        callback( currTime + timeToCall );
      }, timeToCall );
      lastTime = currTime + timeToCall;
      return id;
    };

    cancelAnimationFrame = function( id ) {
      window.clearTimeout( id );
    };
  }

  // put in global namespace
  window.requestAnimationFrame = requestAnimationFrame;
  window.cancelAnimationFrame = cancelAnimationFrame;

})( window );


// ======================= class change utility functions ========================

Element.prototype.hasClassName = function (a) {
    return new RegExp("(?:^|\\s+)" + a + "(?:\\s+|$)").test(this.className);
};

Element.prototype.addClassName = function (a) {
    if (!this.hasClassName(a)) {
        this.className = [this.className, a].join(" ");
    }
};

Element.prototype.removeClassName = function (b) {
    if (this.hasClassName(b)) {
        var a = this.className;
        this.className = a.replace(new RegExp("(?:^|\\s+)" + b + "(?:\\s+|$)", "g"), " ");
    }
};

Element.prototype.toggleClassName = function (a) {
  this[this.hasClassName(a) ? "removeClassName" : "addClassName"](a);
};

// ======================= ZZ site script ===============================


// global object
var ZZ = window.ZZ = {};

ZZ.init = function() {
  var i, len;
  
  if ( Modernizr.csstransitions ) {
    ZZ.colorT = ~~(Math.random()*18);
    document.body.addClassName('transitions-ready');
    ZZ.changeColor();
  }

  if ( !document.querySelectorAll ) {
    return;
  }
  
  // Do some groovin'
  if ( !Modernizr.textshadow ) {
    return;
  }
  ZZ.groovers = [];
  var grooverElems = document.querySelectorAll('.groover');
  len = grooverElems.length;
    
  for ( i=0; i<len; i++ ) {
    ZZ.groovers.push( new ZZ.Groover( grooverElems[i] ) );
  }

};

// cycles link colors
ZZ.changeColor = function() {
  document.body.removeClassName( 'color' + ZZ.colorT % 18 );
  ZZ.colorT++;
  document.body.addClassName( 'color' + ZZ.colorT % 18 );
  setTimeout( ZZ.changeColor, 3000 );
};



// ======================= Groover ===============================
// generates funky H1 super text-shadows
ZZ.Groover = function( elem ) {
  
  this.elem = elem;
  this.panes = parseInt( this.elem.getAttribute('data-groover-panes'), 10 );
  
  this.colorTime = ~~( Math.random() * 360 );
  this.waveTheta = 0;

  this.colorIncrement = -1;

  this.elem.addEventListener( 'mouseover', this, false );
  this.elem.addEventListener( 'mouseout', this, false );

  // kick off animation
  this.animate();

};

// ----- event handling ----- //

ZZ.Groover.prototype.handleEvent = function( event ) {
  var handlerMethod = event.type + 'Handler';
  if ( this[ handlerMethod ] ) {
    this[ handlerMethod ]( event );
  }
};

ZZ.Groover.prototype.mouseoverHandler = function() {
  this.isHovered = true;
};

ZZ.Groover.prototype.mouseoutHandler = function() {
  this.isHovered = false;
};

// ----- methods ----- //

ZZ.Groover.prototype.getTextShadow = function( x, y, hue, alpha ) {
  return ', ' + x + 'px ' + y + 'px hsla(' + hue + ', 100%, 45%, ' + alpha + ')';
};

ZZ.Groover.prototype.animate = function() {
  var shadows = '0 0 transparent',
      i, j, x, y;

  // renders rainbow river
  for ( i = 1; i < this.panes; i++ ) {
    var normI = i / this.panes,
        hue = this.isHovered ?
          ( normI * 400 + this.colorTime * 9 ) % 360 :
          ( normI * 50 + this.colorTime * 0.5 ) % 360,
        alpha = this.isHovered ? 1 : ( 1 - normI ) * 0.8;
    hue = this.isHovered ? ( Math.floor( ( hue / 360 ) * 6 ) / 6 ) * 360 : hue;
    x = i * 2;
    y = i * 2;
    shadows += this.getTextShadow( x, y, hue, alpha );
  }

  this.elem.style.textShadow = shadows;
  this.colorTime += this.colorIncrement;
  window.requestAnimationFrame( this.animate.bind( this ) );
};


window.addEventListener( 'DOMContentLoaded', ZZ.init, false );
