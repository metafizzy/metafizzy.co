---

title: Lots of files, but only one in my&nbsp;head
category: blog
layout: blog

---

Right now, if you wanted to use [Flickity](http://flickity.metafizzy.co) using every source file, you would need to hook up 17 different JavaScript files. I actually do this for the [sandbox demos used for development](https://github.com/metafizzy/flickity/blob/v0.1.0/sandbox/basic.html#L138-L155).

{% highlight html %}
<!-- dependencies -->
<script src="../bower_components/get-style-property/get-style-property.js"></script>
<script src="../bower_components/get-size/get-size.js"></script>
<script src="../bower_components/matches-selector/matches-selector.js"></script>
<script src="../bower_components/eventEmitter/EventEmitter.js"></script>
<script src="../bower_components/eventie/eventie.js"></script>
<script src="../bower_components/doc-ready/doc-ready.js"></script>
<script src="../bower_components/classie/classie.js"></script>
<!-- Flickity source -->
<script src="../js/utils.js"></script>
<script src="../js/unipointer.js"></script>
<script src="../js/cell.js"></script>
<script src="../js/prev-next-button.js"></script>
<script src="../js/page-dots.js"></script>
<script src="../js/player.js"></script>
<script src="../js/drag.js"></script>
<script src="../js/animate.js"></script>
<script src="../js/cell-change.js"></script>
<script src="../js/flickity.js"></script>
{% endhighlight %}

Granted, this looks like madness. If you're a front-end developer worth your salt, seeing 17 consecutive `<script>` tags should make you  cringe. But this madness has a purpose.

## Encapsulation

Encapsulation is a powerful programming concept. I like to think of it in a literal sense: _encapsulation_ means _making capsules_, or in other words, _breaking down something large into smaller pieces — making it easier to swallow_.

Typically, encapsulation is exhibited in how you structure code. Consider this function used to check support for a browser feature:

{% highlight js %}
var supportsConditionalCSS = ( function() {
  var supports;
  return function checkSupport() {
    if ( supports !== undefined ) {
      return supports;
    }
    // style body's :after and check that
    var style = document.createElement('style');
    var cssText = document.createTextNode('body:after { content: "foo"; display: none; }');
    style.appendChild( cssText );
    document.head.appendChild( style );
    var afterContent = getComputedStyle( document.body, ':after' ).content;
    // check if able to get :after content
    supports = afterContent.indexOf('foo') != -1;
    document.head.removeChild( style );
    return supports;
  };
})();
{% endhighlight %}

This can be simplified conceptually:

{% highlight js %}
var checkSupport = ( function() {
  var support;
  function check() {
    // if already checked, return that answer
    if ( support !== undefined ) {
      return support
    }
    // check support one-time-only
    // lots of logic to check support
    support = // ...
    return support;
  }
  return check;
})();
{% endhighlight %}

The `checkSupport` logic is enclosed in a IIFE. It's internal variables, `support` and `check()` are kept private within the IIFE, so they don't have naming conflicts with outside variables, nor can they be interfered with. There's a performance benefit, as data within the IIFE can be garbage collected. The only exposed piece of logic is `checkSupport()`.

There are multiple technical benefits to using encapsulation: DRYer code, less conflicts, garbage collection. But I find the biggest benefit is a more human one. Encapsulation helps me keep the story straight in my head.

## Stories

Humans think in stories. This is why movies aren't abstract audio-visual sensory experiences, but audio-visual narratives. This is why I can't name the Canadian Prime Minister but I can name the lords and ladies of all seven kingdoms of _Game of Thrones_ (apologies to _Stephen Harper_, had to look it up).

When we write code, we are writing instructions — stories for machines to act out. It may seem like the code your write exists only on the screen, but it also occupies space in your mind. The longer the code, the harder it is to remember how the story goes. By breaking up the code into smaller parts, you no longer have to keep the entire mental model in your head. You can focus on the one piece you're working on.

Take Flickity's [Player](https://github.com/metafizzy/flickity/blob/v0.1.0/js/player.js) class. Its one purpose is to tick every couple of seconds and advance the gallery to the next cell. I could have built this functionality right into the core `flickity.js` file. By making it a separate concept, the code makes for a cleaner API.

{% highlight js %}
this.player = new Player( this );
this.player.play();
this.player.stop();
// pauses stops playing, but can be unpaused
this.player.pause();
// unpauses resumes playing, if not stopped while paused
this.player.unpause();
{% endhighlight %}

A clean API is a programmer's way of saying _an easy story_. The `Flickity` instance doesn't need to keep track of the `player`'s state. Nor does the `player` need to know how the `Flickity` instance works. Both classes are self-contained in little stories.

Flickity is composed of many of these little stories — one to handle [the previous & next buttons](https://github.com/metafizzy/flickity/blob/v0.1.0/js/prev-next-button.js), one to handle [the bottom dots](https://github.com/metafizzy/flickity/blob/v0.1.0/js/page-dots.js), one to handle [individual cells](https://github.com/metafizzy/flickity/blob/v0.1.0/js/cell.js). There's also [dependencies that provide the foundation](https://github.com/metafizzy/flickity/blob/v0.1.0/bower.json#L9-L17). While it may appear that the project is growing out of control, it feels manageable because each component has its own separate story, with a well-defined purpose. I can manage each one individually, and then put them together to make something special.

---

Encapsulating functionality into separate files and separate projects is not a new concept for developers, but it is new for front-end developers. Putting together all these pieces is a challenge all its own — one that I'll discuss in a future post.

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

[Flickity beta is out](http://flickity.metafizzy.co/). Give 'er a flick!
