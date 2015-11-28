---

title: Comparing Quicksand and&nbsp;Isotope
category: blog
layout: blog

---

[John McLear asks](https://twitter.com/#!/johnmclear/status/44495356230238208):

> Any info available comparing {Quicksand and Isotope}? Both seem to "tick my box"

First off, I need to give [Jacek Galanciak](http://razorjack.net/) the credit he deserves. Without [Quicksand](http://razorjack.net/quicksand/), I would have never found inspiration to build filtering into jQuery Masonry, and subsequently build Isotope into its own filtering and sorting machine. Mr. Razorjack did a superb job of mimicking Mac OS X's animated filters. It was his idea from the beginning and I'm grateful that he brought it to life. Jacek has been [credited front and center in the Introduction to Isotope](http://isotope.metafizzy.co/docs/introduction.html#acknowledgments).

My issue with Quicksand is that I never knew how to implement it. To be honest, I've never actually attempted using it. From what I understand, you need to provide duplicate mark up for the group you wish to display. That is: one group for the filtered, one group for all of items, another group for sorted items. There is a way with [to filter and sort using only one set of markup with Quicksand](http://razorjack.net/quicksand/demos/one-set-clone.html), but it requires a fair amount of custom jQuery script to get it working.

As a jQuery user, I was unsatisfied with Quicksand's implementation. The user should not be responsible for building all the sorting and filtering logic. It should be built into the plugin itself. Developing Isotope, I aimed to make filtering and sorting accessible to any user.

I would say ease of use is the principal difference between Quicksand and Isotope. To filter a group with Isotope, you only need to pass in a jQuery selector string to the `filter` option:

``` javascript
$('#container').isotope({ filter: '.foo' });
```
    
But the differences extend beyond that. Here's a list of features you get with Isotope that aren't currently in Quicksand:

+ [Progressive enhancement on animations](http://isotope.metafizzy.co/docs/animating.html) with CSS transitions and hardware acceleration when available
+ [Multiple layout modes](http://isotope.metafizzy.co/docs/layout-modes.html)
+ Caches item elements for better performance
+ [Plenty of convenient methods](http://isotope.metafizzy.co/docs/methods.html)
+ [Plays nice with Infinite Scroll](http://isotope.metafizzy.co/demos/infinite-scroll.html)

At first glance, the two plugins are remarkable similar. But I feel once you try putting one into use, it will become clear what Isotope can offer.
