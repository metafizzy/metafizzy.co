// global object
window.ZZ = {};

ZZ.init = function() {
  
  
  // use proper fi ligature
  var metafizzies = document.querySelectorAll('.metafizzy');
  for ( var i =0, len = metafizzies.length; i<len; i++ ) {
    metafizzies[i].innerHTML = 'Meta&#64257;zzy';
  }
  
};



window.addEventListener( 'DOMContentLoaded', ZZ.init, false );