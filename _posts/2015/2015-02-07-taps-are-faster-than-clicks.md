---

title: Taps are faster than clicks
category: blog
layout: blog

---

[Flickity](http://flickity.metafizzy.co) had a bug. Tapping on the [previous & next buttons felt slow](https://github.com/metafizzy/flickity/issues/4) on iOS. It's a small but important behavior. If the user doesn't immediately get feedback of their click, they are likely to click again in case they miss-clicked. This could trigger two delayed click events and throw off the state of the UI from the user's intent.

Try out this [click event demo](http://codepen.io/desandro/full/EabQgK/) in a mobile browser.

<p data-height="268" data-theme-id="0" data-slug-hash="EabQgK" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/EabQgK/'>EabQgK</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

On a desktop browser, the click event fires immediately. But on iOS (v8.1.3) Safari (and on iOS Chrome v40), the click event happens after a little delay.

<div class="fit-video fit-video--3x2">
  <iframe src="https://vid.me/e/W0Fx?autoplay=1&loop=1&muted=1" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen scrolling="no"></iframe>
</div>

Interestingly, if you hold down the tap a bit longer, the click event fires immediately when the touch is released.

<div class="fit-video fit-video--3x2">
  <iframe src="https://vid.me/e/ap16?autoplay=1&loop=1&muted=1" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen scrolling="no"></iframe>
</div>

[Jake Archibald explains](http://updates.html5rocks.com/2013/12/300ms-tap-delay-gone-away):

> If you go to a site that isn't mobile optimised, it starts zoomed out so you can see the full width of the page. To read the content, you either pinch zoom, or double-tap some content to zoom it to full-width. This double-tap is the performance killer, because with every tap we have to wait to see if it might become a double-tap, and that wait is 300ms.

The solution recommended there is to use disable page zooming.

{% highlight html %}
<meta name="viewport" content="width=device-width, user-scalable=no">
{% endhighlight %}

This may work for some recent mobile browsers, but in [my testing](http://codepen.io/desandro/full/EabQpZ), I don't see an improvement. It also requires changing with the meta `viewport` tag, which is something a third-party library shouldn't be messing with.

## Tap Listener

For Flickity, my solution was to build a little library to handle this one job. [Tap Listener](https://github.com/metafizzy/tap-listener) listens for taps. It listens for mouse, touch, and pointer events to trigger `.on( 'tap', callback )`.

<p data-height="268" data-theme-id="0" data-slug-hash="YPEeOL" data-default-tab="result" data-user="desandro" class='codepen'>See the Pen <a href='http://codepen.io/desandro/pen/YPEeOL/'>Click event - with tap listener</a> by David DeSandro (<a href='http://codepen.io/desandro'>@desandro</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

The results are much better. Taps are triggered immediately. You can do multiple taps in quick succession. It feels natural.

<div class="fit-video fit-video--3x2">
  <iframe src="https://vid.me/e/3XpS?autoplay=1&loop=1&muted=1" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen scrolling="no"></iframe>
</div>

Looking at the video, you can notice that 300ms click delay. It seems awkward compared to the immediate tap event. When you touch something, you have an implicit expectation that your touch will have an immediate effect. Bringing UI behavior closer to real-world behavior helps make it feel natural and comfortable to use.

<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Previously

If you're just joining us, I'm making a new gallery library! The story thus far...

+ [Initial demos](/blog/initial-demos)
+ [Math time: Resting position](/blog/math-time-resting-position/)
+ [Particle to slider](/blog/particle-to-slider/)
+ [Flickity begins](/blog/flickity-begins/)
+ [Making SVG buttons](/blog/making-svg-buttons/)
+ [The best time](/blog/the-best-time/)
+ [Setting JavaScript functionality with CSS](/blog/setting-javascript-functionality-with-css/)
+ [Front-end testing with QUnit](/blog/front-end-testing-qunit/)
+ [Flickity beta testing](/blog/flickity-beta-testing/)
+ [Lots of files, but only one in my head](/blog/lots-of-files/)
+ [Making features independent with internal events](/blog/making-features-independent-with-internal-events/)

[Flickity beta is out](http://flickity.metafizzy.co/). Give 'er a flick!
