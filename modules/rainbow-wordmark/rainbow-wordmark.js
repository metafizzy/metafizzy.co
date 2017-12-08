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
var canvasWidth, canvasHeight;

// ----- load image ----- //

var whiteImg = new Image();
whiteImg.onload = onWhiteImgLoad;
whiteImg.src = '/img/metafizzy-wordmark-fizzy-script.png';

function onWhiteImgLoad() {
  canvasWidth = canvas.width = whiteImg.width + trailCount;
  canvasHeight = canvas.height = whiteImg.height + trailCount;
  setColorCanvas( 'blue', '#19F' );
  setColorCanvas( 'gold', '#EA0' );
  setColorCanvas( 'orange', '#E62' );
  setColorCanvas( 'magenta', '#C25' );
  animate();
}

var colorCanvases = {};

// get a canvas with the logotype rendered in a color
function setColorCanvas( name, color ) {
  var colorCanvas = document.createElement('canvas');
  colorCanvas.width = whiteImg.width;
  colorCanvas.height = whiteImg.height;
  var colorCtx = colorCanvas.getContext('2d');
  colorCtx.drawImage( whiteImg, 0, 0 );
  colorCtx.globalCompositeOperation = 'source-in';
  colorCtx.fillStyle = color;
  colorCtx.fillRect( 0, 0, whiteImg.width, whiteImg.height );
  colorCanvases[ name ] = colorCanvas;
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

var colorCycle = [ 'blue', 'gold', 'orange', 'magenta' ];

function animate() {
  update();
  render();
  requestAnimationFrame( animate );
}

function update() {
  t++;

  var colorCycleIndex = Math.floor( t / 8 ) % 4;
  var nextColor = isHovering ? colorCycle[ colorCycleIndex ] : null;

  rainbow.pop();
  rainbow.pop();
  rainbow.pop();
  rainbow.pop();
  rainbow.unshift( nextColor );
  rainbow.unshift( nextColor );
  rainbow.unshift( nextColor );
  rainbow.unshift( nextColor );
}

function render() {
  ctx.clearRect( 0, 0, canvasWidth, canvasHeight );

  // iterate backwards through rainbow
  for ( var i = rainbow.length-1; i >= 0; i-- ) {
    var color = rainbow[i];
    if ( color ) {
      ctx.drawImage( colorCanvases[ color ], i+1, i+1 );
    }
  }
}

})();
