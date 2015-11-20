/**
 * homepage packery demo
 */

/* globals Packery: false */

(function() {

var grid = document.querySelector('.showcase-packery-demo__grid');

if ( !grid ) {
  return;
}

var pckry = new Packery( '.showcase-packery-demo__grid', {
  itemSelector: '.showcase-packery-demo__grid__item',
  columnWidth: '.showcase-packery-demo__grid__sizer',
  rowHeight: '.showcase-packery-demo__grid__sizer',
  gutter: 5,
  percentPosition: true
});

var draggie = new Draggabilly('.showcase-packery-demo__grid__item--draggable');

pckry.bindDraggabillyEvents( draggie );

})();
