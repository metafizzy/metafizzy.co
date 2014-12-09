---

title: Initial demos
category: blog
layout: blog

---

I'm attempting to make a new product for Metafizzy. As part of its development, I'm going to be ambitious and try to blog the process.

---

Here's the idea:

_A swipeable gallery widget that feels natural, like a native mobile swipeable view_

There already are other great solutions out there, that are touch responsive and have nice animations. But when you swipe back and forth a bunch, they start to feel unnatural, with animations that don't quite feel right. I think there's an opportunity there. First step is to see if this is an idea worth pursuing by throwing together some initial demos.

These demos are (as [Dave Wright](https://twitter.com/dwjr) would put it) _guts on the table_. Totally sloppy. No hang-ups on quality or style. It's the kind of work that happens at the beginning to get the creative process going.

First demo is a draggable particle dot with barebones physics. You can drag and release the dot, and it will keep moving with inertia, slowing down with friction.

<p data-height="268" data-theme-id="0" data-slug-hash="GgoGrP" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/GgoGrP/'>Flickity initial demo 1: draggable dot</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

{% highlight js %}
Particle.prototype.update = function() {
  this.velocity += this.accel;
  this.velocity *= ( 1 - friction );
  this.x += this.velocity;
  this.accel = 0;
};
{% endhighlight %}

I'm trying to see how a gallery would move if it worked like a physics demo, with dragging and attraction forces. Demo #2 add two attractors that pull the dot in.

<p data-height="268" data-theme-id="0" data-slug-hash="xbZzqX" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/xbZzqX/'>Flickity initial demo 2: attractors</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

{% highlight js %}
// apply force of attractors to particle
if ( !isDragging ) {
  for ( var i=0, len = attractors.length; i < len; i++ ) {
    var attractor = attractors[i];
    var distance = attractor.x - particle.x;
    var force = Math.max( maxDistance - Math.abs( distance) , 0 );
    force /= maxDistance;
    force *= force;
    force *= distance > 0 ? 1 : -1;
    force *= 4;
    particle.applyForce( force );
  }
}
{% endhighlight %}

This was my first idea on how the force fields should work.  As the dot gets closer to the attractor, the force of attraction increases. This is how gravity works. I modeled this demo after the basic [gravity demo in The Nature of Code](http://natureofcode.com/book/chapter-2-forces/#chapter02_example6). This lets the dot ease-in to the force field. But it hits the attractor abruptly, then starts shaking. If you try to flick the dot from one attractor to another, it feels like it has to pass over a big hump.

Demo #3 reverses the force field. Instead of attraction being highest at the center of the attractor, it's higher further from the particle. This is like a rubber band. The further you pull a rubber band, the more force the band pulls back. It sounds counter-intuitive, but the result feels much nicer. The particle eases-in to the attractor, rather than accelerating towards it.

<p data-height="268" data-theme-id="0" data-slug-hash="KwVeqV" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/KwVeqV/'>Flickity initial demo 3: attractors</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

{% highlight js %}
var distance = attractor.x - particle.x;
var force = Math.abs( distance ) <= maxDistance ? distance : 0;
force *= 0.03;
particle.applyForce( force );
{% endhighlight %}

Those force multipliers like `force *= 0.03` and `force *= 4` are completely arbitrary. It's the result of me fiddling with the numbers to get better behavior.

This demo is an improvement over the previous, but it's wobbly and could use some fiddling. Demo #4 fiddles with friction and force.

{% highlight js %}
var friction = 0.3;

var force = Math.abs( distance ) < maxDistance ?
  Math.abs( distance ) / maxDistance : 0;
force *= 8;
force = distance < 0 ? -force : force;
{% endhighlight %}

<p data-height="268" data-theme-id="0" data-slug-hash="WbryZb" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/WbryZb/'>Flickity initial demo 4: fiddling</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

This is feeling good. I can flick the dot to the next attractor. I can also flick it over two attractors with a big flick. If the dot is released a little bit away, it nestles back into its origin. But it doesn't feel effortless. You need a big flick to move the dot from one attractor to another.

My next idea is to adjust friction so that the particle can escape its current attractor and easily get to its next one.

{% highlight js %}
var force = Math.abs( distance ) < maxDistance ?
  Math.abs( distance ) / maxDistance : 0;
var friction = force ? 1 - force : 0;
friction *= 0.3;
force *= 8;
force = distance < 0 ? -force : force;
particle.friction = Math.max( particle.friction, friction );
particle.applyForce( force );
{% endhighlight %}

I don't understand my own code here, but I don't care either. I only care about the resulting behavior.

<p data-height="268" data-theme-id="0" data-slug-hash="LEGJaL" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/LEGJaL/'>Flickity initial demo 5: dynamic friction</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

Neat idea but not much of an improvement. Next idea!

The problem is that the attractor where the flick starts will pull the dot back to before it gets a chance to escape. What if this origin attractor is disabled, and only the end attractor is active.

Demo #6 is just a drag/flick demo like the first, but this one predicts where the dot will end up after a flick.

<p data-height="268" data-theme-id="0" data-slug-hash="myVzRQ" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/myVzRQ/'>Flickity initial demo 6: get resting position</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

(I'll follow up on the math used to calculate end position in a later post.)

Now I can use the calculated end-of-flick position to activate the closest attractor.

<p data-height="268" data-theme-id="0" data-slug-hash="emJPRg" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/emJPRg/'>Flickity initial demo 7: activate closest attractor</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

Hey, not bad! This demo feels pretty good. Not perfect, but good enough that I know the concept has merit.

The sliding behavior is the primary user experience of the gallery. I could have started this project working on the markup or API or animation engine. But by starting with these behavioral demos, I get to focus on what will make the product special.

<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
