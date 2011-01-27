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
  
};


ZZ.changeColor = function() {
  document.body.removeClassName( 'color' + ZZ.colorT % 18 );
  ZZ.colorT++;
  document.body.addClassName( 'color' + ZZ.colorT % 18 )
  setTimeout( ZZ.changeColor, 3000 );
}


window.addEventListener( 'DOMContentLoaded', ZZ.init, false );