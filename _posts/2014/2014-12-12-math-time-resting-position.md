---

title: 'Math time: Resting position'
category: blog
layout: blog

---

[In the previous post](/blog/initial-demos), I presented a demo that calculates the resting position of a particle. This turned out to be an interesting exercise in problem solving.

Try flicking this dot around to see a green dot in place where the red dot will eventually rest.

<p data-height="268" data-theme-id="0" data-slug-hash="ByKNLb" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/myVzRQ/'>Flickity initial demo 6: get resting position</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

Making and learning new things is an awkward process. Looking at this demo, it can appear like I know what I'm doing. But that's not how it came to be. Struggling to find a solution is part of the process.

Calculating resting position of a moving particle is a concept I first read about in [_Animate Your Way to Glory_ by Steven Wittens](http://acko.net/blog/animate-your-way-to-glory). The article is remarkable work about animation, physics and the math that underlies it all. The step-by-step animated graphs are great at aiding comprehension of these dense topics.

Steven mentions that calculating final position could be done with integration and calculus, concepts well outside my comfort zone. I knew the calculation could be done, but didn't know how it would work. This was the struggle.

---

Flicking is done by applying a velocity to the dot when you release it from a drag. Once flicked, the dot will keep moving, decelerating due to friction.

``` js
function dragEnd() {
  // set particle velocity
  particle.velocity = ( particle.x - previousX ) / ( currentTime - previousTime );
  particle.velocity *= 17;
}

Particle.prototype.update = function() {
  this.velocity += this.accel;
  this.velocity *= ( 1 - this.friction );
  this.x += this.velocity;
  // reset acceleration
  this.accel = 0;
};
```

I have all the variables I need to calculate its end position: acceleration, velocity, position. But I need the math to do it. This is where I stumble to remember rusty math skills from high school. I know velocity is decreasing due to friction. With each tick of the animation, the velocity is multiplied by the friction effect.

``` js
this.velocity *= ( 1 - this.friction );
```

I can calculate the velocity after 3 ticks of animation by multiplying it by the friction effect three times over.

``` js
veloAfter3 = this.velocity * ( 1 - this.friction ) * ( 1 - this.friction ) * ( 1 - this.friction )
```

This looks to be exponential. 

## log pow

``` js
// t is number of ticks of animation
endVelo = startVelo * ( 1 - friction ) ^ t
```

Eventually, velocity will reach 0, and the dot stops moving. I can't get its end position from this equation, but I can figure out how many ticks of animation happen. The number in question is `t`. This looks like algebra, which I can handle. It's an exponent, which leads me to remember logarithms. I forget how they work. [Khan Academy refreshes](https://www.khanacademy.org/math/algebra2/logarithms-tutorial/logarithm_basics/v/logarithms) my memory. `eV` is end velocity, `sV` is start velocity.

![Velocity, logarithm equations](http://i.imgur.com/qF6QSER.jpg)

I've got the equation worked out. Now to bring it into JavaScript. [`Math.log` is in base `e`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log), and this equation has a different base `1 - f`. The MDN article even covers using [`Math.log` with different bases](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log#Example.3A_Using_Math.log_with_a_different_base).

``` js
var ticks = getBaseLog( 1 - this.friction, restingVelo / Math.abs( this.velocity ) );

function getBaseLog( a, b ) {
  return Math.log( b ) / Math.log( a );
}
```

I've got the number of ticks of animation for the particle to reach its resting position. With this, I can use the position equation, which is just `x = x + velocity` every frame. With each frame velocity decreases due to the friction factor `velocity = velocity * ( 1 - friction)`. 

``` js
// fF = 1 - friction = friction factor
// initial tick
v = v * fF;
x = x + v;
// tick 2
v = v * fF;
x = x + v;
// tick 3
v = v * fF;
x = x + v;
// for t ticks
...

// put it all in a single equation
restingX = x + (v * fF) + (v * fF^2) + (v * fF^3) + ... (v * fF^t)
// factor out v
restingX = x + v * (1 + fF^1 + fF^2 + fF^3 + ... fF^t)
```

I could solve this with a loop, but this feels like there's a smarty-pants math technique that can solve the ascending exponential portion. Turns out, [there is](http://mikestoolbox.com/powersum.html)!

``` js
restingX = x + v * (1 + fF^1 + fF^2 + fF^3 + ... fF^t)
restingX = x + v * ( (fF^t - 1) / (t - 1) )
```

``` js
var sum = ( Math.pow( fFriction, ticks + 1 ) - 1 ) / ( fFriction - 1 );
// resting position
return this.x + this.velocity  * sum;
```

``` js
// as implemented
Particle.prototype.getRestingPosition = function() {
  // get how many ticks until velocity is slow
  var restingVelo = 0.07; // ideally, this is 0, but that would take infinite amount of ticks
  var fFriction = 1 - this.friction;
  var ticks = getBaseLog( fFriction, restingVelo / Math.abs( this.velocity ) );
  // integrate to determine resting position
  var sum = ( Math.pow( fFriction, ticks + 1 ) - 1 ) / ( fFriction - 1 );
  // additional fFriction to account for initial tick
  return this.x + this.velocity * fFriction * sum;
}

function getBaseLog( a, b ) {
  return Math.log( b ) / Math.log( a );
}
```

## Programming loop

I tackled this problem with algebra because it felt like the proper way to do it. But my initial inclination was to run a sort of simulation, using a programming loop — a more familiar concept. I was able to write this code in one shot.

``` js
// little simulation where thing will rest
var restingVelo = 0.07;
var velo = this.velocity;
var restX = this.x;
// keep iterating until simulation velocity is close to 0
while ( Math.abs( velo ) > restingVelo ) {
  velo *= 1 - this.friction;
  restX += velo;
}
return restX;
```

And wouldn't ya know it. This code works just as well.

<p data-height="268" data-theme-id="0" data-slug-hash="VYarRY" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/VYarRY/'>Flickity initial demo: get resting position, programming loop</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

This code is much easier to read and understand. It even [performs better on most browsers](http://jsperf.com/loop-vs-log/) (`Math.log` and `Math.pow` can be expensive operations).

---

So after going through all the rigamarole with re-learning logarithms, and uncovering that exponential math bit, a better solution was in my grasp the entire time.

Afterward, I even tried digging deeper into [Khan Academy's calculus videos](https://www.khanacademy.org/math/differential-calculus) in an effort to find a more elegant solution. No luck so far. If you know a better way to do this, please [give me a holler](https://twitter.com/metafizzyco). I can use your enlightenment.

<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
