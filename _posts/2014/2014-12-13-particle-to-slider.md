---

title: Particle to slider
category: blog
layout: blog

---

The [initial demos](/blog/initial-demos) dealt with a particle — an single point in space.

<p data-height="240" data-theme-id="0" data-slug-hash="GgoGrP" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/GgoGrP/'>Flickity initial demo 1: draggable dot</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

But the aim of this product is gallery — something that has size.

<p data-height="240" data-theme-id="0" data-slug-hash="myPLJr" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/myPLJr/'>slider demo 1</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

This demo works similarly to the initial particle demo. Instead of positioning the particle, the cells are positioned by the slider.

{% highlight js %}
// render cells
ctx.save();
// position cells by slider
ctx.translate( slider.x, 0 );
for ( var i=0, len = cells.length; i < len; i++ ) {
  var cell = cells[i];
  ctx.fillStyle = 'hsla(0, 100%, 50%, 0.5)';
  ctx.fillRect( cell.x, 20, cell.width, cell.height );
}
ctx.restore();
{% endhighlight %}

The last particle demo used attraction on the particle so it would land nicely at a target.

<p data-height="240" data-theme-id="0" data-slug-hash="emJPRg" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/emJPRg/'>Flickity initial demo 7: activate closest attractor</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

Instead of a particle being attracted to targets, the position of the slider should be attracted to a particular cell. This demo aligns the center of the gallery to the center of a cell.

<p data-height="240" data-theme-id="0" data-slug-hash="WbwJQd" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/WbwJQd/'>slider demo 2: cell attraction</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

{% highlight js %}
function dragEnd() {
  // get closest cell to end position
  var minDistance = Infinity;
  var targetX, distance;
  for ( var i=0, len = cells.length; i < len; i++ ) {
    var cell = cells[i];
    targetX = cell.x + cell.width / 2;
    distance = Math.abs( -estimateX - targetX );
    if ( distance < minDistance ) {
      selectedIndex = i;
      minDistance = distance;
    }
  }
}

// attract the slider to that cell
function getAttraction() {
  var cell = cells[ selectedIndex ];
  var attractorX = cell.x + cell.width / 2;
  var distance = -attractorX - slider.x;
  var force = distance * 0.03;
  return force;
}
{% endhighlight %}

This works well enough when you flick by 2 cells. By you really got to tug it to get it to move to the next cell. Open up your phone's home screen. You can flick to the next screen by just moving it a couple pixels.

This demo fixes that. It adds additional logic so that if the selected cell hasn't changed after a flick, it checks if the user is moving to the next cell. Even if its just a little little bit, it will select the next cell.

<p data-height="240" data-theme-id="0" data-slug-hash="vEGjOG" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/vEGjOG/'>slider demo 3: cell attraction</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

{% highlight js %}
// if not enough velocity to escape current attractor
// boost it
if ( selectedIndex === prevIndex  ) {
  var selectedCell = cells[ selectedIndex ];
  targetX = selectedCell.x + selectedCell.width / 2;
  distance = -slider.x - targetX;
  if ( distance > 0 && slider.velocity < -1 && cells[ selectedIndex + 1 ] ) {
    // if moving towards the right, and negative velocity, and next attractor
    selectedIndex++;
  } else if ( distance < 0 && slider.velocity > 1 && cells[ selectedIndex - 1 ] ) {
    // if moving towards the left, and positive velocity, and previous attractor
    selectedIndex--;
  }
}
{% endhighlight %}

Niiiiiiiice.

This code works just as well for cells with varying widths.

<p data-height="240" data-theme-id="0" data-slug-hash="pvyVgZ" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/pvyVgZ/'>slider demo 4: varying widths</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

... or with different alignment. This demo has the cursor and cell targets aligned on the left.

<p data-height="240" data-theme-id="0" data-slug-hash="gbrzrm" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/gbrzrm/'>slider demo 5: left aligned</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

---

At this point, I feel I have a proper prototype for the gallery. It has dragging, alignment, sizing. It also works as a sandbox if I ever need to focus just on the behavior.

What's interesting is the discovering some of the counter-intuitive code that needed to be added in order for the interaction to feel 'natural.'

1. Rubber-band physics to attract the cursor towards a target
2. Selecting a target rather than letting all the forces take their effect
3. Boosting subtle movement so flicking to the next cell feels effortless

Next up: it's time to make a library.

<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
