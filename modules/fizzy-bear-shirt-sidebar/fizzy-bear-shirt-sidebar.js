( function() {

  var elem = document.querySelector('.fizzy-bear-shirt-sidebar');
  if ( !elem ) {
    return;
  }


  var endDate = new Date( 2016, 10, 29 );
  var days = Math.round( ( endDate - new Date() ) / ( 1000 * 60 * 60 * 24 ) );
  elem.querySelector('.fizzy-bear-shirt-sidebar__title').textContent = 'Rainbow bear shirts. ' +
    'Only on sale for ' + days + ' more days.';

})();