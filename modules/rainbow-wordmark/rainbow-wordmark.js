/**
 * animate wordmark rainbow
 */

( function() {

var wordmark = document.querySelector('.rainbow-wordmark');

// bail if wordmark is not on page
if ( !wordmark ) {
  return;
}

var wordmarkImg = wordmark.querySelector('.rainbow-wordmark__image');
var canvas = wordmark.querySelector('.rainbow-wordmark__canvas');

var ctx = canvas.getContext('2d');
var trailCount = 100;

// ----- load images ----- //

var imgs = {};

loadImg('/img/wordmark-blue.png');
loadImg('/img/wordmark-gold.png');
loadImg('/img/wordmark-orange.png');
loadImg('/img/wordmark-magenta.png');

function loadImg( url ) {
  var img = new Image();
  imgs[ url ] = img;
  img.onload = onImgLoad;
  img.src = url;
}

var loadCount = 0;

function onImgLoad() {
  loadCount++;
  if ( loadCount === 4 ) {
    animate();
  }
}

// ----- animate rainbow ----- //

var isHovering = false;
var t = 0;

var rainbow = [];
(function() {
  for ( var i=0; i < trailCount; i++ ) {
    rainbow.push(null);
  }
})();

wordmarkImg.onmouseenter = function() {
  isHovering = true;
};

wordmarkImg.onmouseleave = function() {
  isHovering = false;
};

var imgCycle = [
  imgs['/img/wordmark-blue.png'],
  imgs['/img/wordmark-gold.png'],
  imgs['/img/wordmark-orange.png'],
  imgs['/img/wordmark-magenta.png']
];

function animate() {
  update();
  render();
  requestAnimationFrame( animate );
}

function update() {
  t++;

  var colorCycleIndex = Math.floor( t / 10 ) % 4;
  var cycleImg = imgCycle[ colorCycleIndex ];
  var nextImg = isHovering ? cycleImg : null;

  rainbow.pop();
  rainbow.pop();
  rainbow.pop();
  rainbow.unshift( nextImg );
  rainbow.unshift( nextImg );
  rainbow.unshift( nextImg );
}

function render() {
  ctx.clearRect(0, 0, 1100, 400);

  // iterate backwards through rainbow
  for ( var i = rainbow.length-1; i >= 0; i-- ) {
    var img = rainbow[i];
    if ( img ) {
      ctx.drawImage( img, i+1, i+1 );
    }
  }
}

})();
