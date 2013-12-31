---

title: Isotope v1.5 - Hollaback now y'all
category: blog
layout: blog

---

Proper callbacks that trigger after animations has been one of [oldest lingering issues with Isotope](https://github.com/desandro/isotope/issues/6) since its release. But fret no more! With yesterday's release of version 1.5, Isotope can callback all over the dance floor. Check out the [sweet callback action on this test page](http://isotope.metafizzy.co/tests/callbacks.html).

Like most issue resolutions, I had punted this one for a while because I knew that getting it to work would take a lot of code. [I was right.](https://github.com/desandro/isotope/compare/2deee262...0da45d2c#jquery.isotope.js) You might think _"jQuery has callback integration in just about everything. How hard can it be?"_ The problem is not so much with jQuery, as it is with triggering a callback with CSS transitions in place.  Here's a walkthrough of the logic that had to be put into place _just_ for CSS transition callbacks.

+ Get [transition-end event name](http://dropshado.ws/post/1393565298/css-transition-end-events) for browser, i.e. `WebkitTransitionEnd`. [lines 255-261](https://github.com/desandro/isotope/compare/2deee262...0da45d2c#L4R255)
+ Get transition-duration style property name for browser, i.e. `-webkit-transition-duration` [line 262](https://github.com/desandro/isotope/compare/2deee262...0da45d2c#L4R262)
+ For the group of elements that will be transitioned, check if one of them actually has a transition duration value greater than 0. [lines 652-668](https://github.com/desandro/isotope/compare/2deee262...0da45d2c#L4R255)
+ If so, bind a callback to that transition-end event for all these elements.  [line 262](https://github.com/desandro/isotope/compare/2deee262...0da45d2c#L4R272)
+ Make sure that callback only triggers once. [line 637](https://github.com/desandro/isotope/compare/2deee262...0da45d2c#L4R637)

Even after all of this there is plenty of use cases that will break a callback from triggering with CSS transitions. But hopefully, for the majority of users, their callbacks will trigger right after the animation or transition completes and no one will be the wiser.  If you do run into problems with this new feature, help a guy out and [submit an issue](https://github.com/desandro/isotope/issues).
