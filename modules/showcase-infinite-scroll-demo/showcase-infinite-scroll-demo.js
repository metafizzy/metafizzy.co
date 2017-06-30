// Infinite Scroll showcase demo

/* globals InfiniteScroll: false */

( function() {

var demoElem = document.querySelector('.showcase-infinite-scroll-demo');

if ( !demoElem ) {
  return;
}

var infScroll = new InfiniteScroll( demoElem, {
  path: 'page{{#}}', // hack
  scrollThreshold: 200,
  elementScroll: true,
  history: false,
  loadOnScroll: false
});

var fragment = document.createDocumentFragment();

var pageIndex = 1;

infScroll.on( 'scrollThreshold', function() {
  pageIndex++;
  createItem('a');
  createItem('b');
  createItem('c');
  createItem('d');
  demoElem.appendChild( fragment );
});

function createItem( letter ) {
  var item = document.createElement('div');
  item.className = 'showcase-infinite-scroll-demo__item';
  item.textContent = pageIndex + letter;
  fragment.appendChild( item );
}

})();
