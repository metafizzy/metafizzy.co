/**
 * homepage isotope demo
 */

/* globals Isotope: false */

(function() {

var demo = document.querySelector('.homepage-isotope-demo');

if ( !demo ) {
  return;
}

var grid = demo.querySelector('.homepage-isotope-demo__grid');
var iso = new Isotope( grid, {
  layoutMode: 'fitRows',
  getSortData: {
    letter: '.homepage-isotope-demo__grid__item__letter',
    number: '.homepage-isotope-demo__grid__item__number parseInt'
  }
});

var buttonGroup = demo.querySelector('.button-group');
buttonGroup.addEventListener( 'click', onButtonGroupClick );


function onButtonGroupClick( event ) {
  // only button clicks
  if ( !event.target.classList.contains('button') ) {
    return;
  }

  var arrangeAttr = event.target.getAttribute('data-arrange');
  iso.arrange( JSON.parse( arrangeAttr ) );
  // change is-selected class
  buttonGroup.querySelector('.is-selected').classList.remove('is-selected');
  event.target.classList.add('is-selected');
}

})();
