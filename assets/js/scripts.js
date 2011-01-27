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
window.ZZ = {};


ZZ.init = function() {
  var i, len;
  
  // feature test for transitions
  // stollen from Modernizr, thx Paul & Faruk
  var domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
      el = document.createElement('zz');
  len = domPrefixes.length;
  for ( i=0; i<len; i++ ) {
    if ( el.style[ domPrefixes[i] + 'TransitionProperty' ] !== undefined ) {
      ZZ.isTransitionsSupported = true;
    }
  }

  if ( ZZ.isTransitionsSupported ) {
    ZZ.colorT = ~~(Math.random()*18);
    document.body.addClassName('transitions-ready');
    ZZ.changeColor();
  }
  
  // use proper fi ligature
  var metafizzies = document.querySelectorAll('.metafizzy');
  len = metafizzies.length
  for ( i=0; i<len; i++ ) {
    metafizzies[i].innerHTML = 'Meta&#64257;zzy';
  }
  
  // Do some groovin'
  if ( document.querySelectorAll ) {
    ZZ.groovers = [];
    var grooverElems = document.querySelectorAll('.groover');
    len = grooverElems.length;
    
    for ( i=0; i<len; i++ ) {
      ZZ.groovers.push( new ZZ.Groover( grooverElems[i] ) )
    }
    
  }
  
  
};

// cycles link colors
ZZ.changeColor = function() {
  document.body.removeClassName( 'color' + ZZ.colorT % 18 );
  ZZ.colorT++;
  document.body.addClassName( 'color' + ZZ.colorT % 18 )
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
  
  // kick off animation
  this.animate();

};

ZZ.Groover.prototype.getTextShadow = function( x, y, hue, alpha ) {
  return ', ' + x + 'px ' + y + 'px hsla(' + hue + ', 100%, 40%, ' + alpha + ')';
};

ZZ.Groover.prototype.animate = function() {
  var shadows = '0 0 transparent',
      hue0 = this.colorTime % 360,
      i, j, x, y;

  // renders rainbow river
  for ( i = 1; i < this.panes; i++ ) {
    var normI = i / this.panes,
        hue = ( normI * 50 + this.colorTime ) % 360,
        alpha = (1-normI) * 0.8;
    x = i * 2;
    y = i * 2;
    shadows += this.getTextShadow( x, y, hue, alpha );
  }

  this.elem.style.textShadow = shadows;
  this.colorTime += this.colorIncrement;
  setTimeout( function( instance ) {
    instance.animate();
  }, 60, this );
};


window.addEventListener( 'DOMContentLoaded', ZZ.init, false );