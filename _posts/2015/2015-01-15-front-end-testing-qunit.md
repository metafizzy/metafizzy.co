---

title: Front-end testing with QUnit
category: blog
layout: blog

---

I've completed my first pass at [Flickity](https://github.com/metafizzy/flickity/)'s API. I've implemented every feature that I originally planned. Which means, right now, it's time for tests.

Testing is perhaps my least favorite part of the development process. It doesn't feel like I'm making anything valuable. If the tests pass, that means the library is working as expected. Whoopee.

But testing is absolutely worthwhile — maybe just not initially. tests provide a clear yes/no signal if the code works. They allow me to check all parts of the codebase with a single action. This greatly simplifies browser testing. Because test cases are run immediately, I also tend to catch weird edge cases and race conditions.

Tests are crucial when I start to change the codebase. Code can grow and shrink and evolve and be reborn. While I have good intentions that my changes are for the better, I tend to muck stuff up. Tests ensure consistent behavior between releases. When behavior is consciously being changed, tests highlight the change in behavior.

## QUnit

I use [QUnit](http://qunitjs.com/) for testing. QUnit has everything I need for front-end testing, and it's easy to implement — one .js file, one .css file. [jQuery uses QUnit](https://github.com/jquery/jquery/tree/1.11.2/test). [Bootstrap uses QUnit](https://github.com/twbs/bootstrap/tree/v3.3.1/js/tests). I'm in good company. 

Here's what the test for initializing a Flickity instance looks like:

{% highlight js %}
test( 'init', function() {

  var elem = document.querySelector('#init');
  var flkty = new Flickity( elem );

  equal( flkty.element, elem, '.element is proper element' );
  equal( flkty.viewport.children[0], flkty.slider, 'slider is in viewport' );
  equal( flkty.viewport.style.height, '100px', 'viewport height set' );

  equal( flkty.cells.length, 6, 'has 6 cells' );
  equal( flkty.cells[0].element.style.left, '0%', 'first cell left: 0%' );
  equal( flkty.cells[5].element.style.left, '500%', '6th cell left: 500%' );

  equal( flkty.selectedIndex, 0, 'selectedIndex = 0' );
  equal( flkty.cursorPosition, 200, 'cursorPosition = 200' );
  equal( flkty.x + flkty.cursorPosition, 0, 'x + cursorPosition = 0' );

});
{% endhighlight %}

As you can see, thrilling stuff. I'm checking that elements are in place, cells have been made & positioned, and the slider is in the correct position. It's basic, almost obvious. But when things start changing around, this basic code can save my butt.

## Testing user interactions

Testing is huge in the world of software, but inside front-end development, I don't see tests as much as I should. Partly, this is because front-end developers may be coming from being designers, where there's no concept of testing. Another reason is because most software deals with data, but front-end development deals with humans. Testing interfaces and user interactions is hard.

For Flickity's tests, I had to test drag interactions. There's a lot that goes on during dragging.

+ User touches down pointer on element
+ User moves pointer (possibly) after some time
+ User moves pointer after some time again  (possibly)
+ User releases up pointer

The difficulty is not just capturing these steps, but all the variations of the interaction that could happen within these steps. The user can make a big drag movement, or she could not move at all, or she could drag to the right, hold, then drag back to where she started (_fake out!_). There's so much to account for.

My solution was to create a function that triggered all the events required for a drag interaction. [The code is a bit monstrous](https://github.com/metafizzy/flickity/blob/ed5f0d337b/test/unit/drag.js), but it works.

<p data-height="480" data-theme-id="0" data-slug-hash="myWLdj" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/myWLdj/'>QUnit testing Flickity drag</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

... sometimes. I'm finding there's some race condition that causes the dragging to occur not when expected. Delightfully, this is hard to test for.

## Previously

If you're just joining us, I'm making a new gallery library! The story thus far...

+ [Initial demos](/blog/initial-demos)
+ [Math time: Resting position](/blog/math-time-resting-position/)
+ [Particle to slider](/blog/particle-to-slider/)
+ [Flickity begins](/blog/flickity-begins/)
+ [Making SVG buttons](/blog/making-svg-buttons/)
+ [The best time](/blog/the-best-time/)
+ [Setting JavaScript functionality with CSS](/blog/setting-javascript-functionality-with-css/)

[Flickity is up on GitHub](https://github.com/metafizzy/flickity). Follow along development!
