/**
 * homepage packery demo
 */

/* globals Packery: false */

(function() {

var grid = document.querySelector('.homepage-packery-demo__grid');

if ( !grid ) {
  return;
}

var pckry = new Packery( '.homepage-packery-demo__grid', {
  itemSelector: '.homepage-packery-demo__grid__item',
  columnWidth: '.homepage-packery-demo__grid__sizer',
  rowHeight: '.homepage-packery-demo__grid__sizer',
  gutter: 5,
  percentPosition: true
});

var draggie = new Draggabilly('.homepage-packery-demo__grid__item--draggable');

pckry.bindDraggabillyEvents( draggie );

})();
