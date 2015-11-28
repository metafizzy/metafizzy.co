---

title: Fading in appended items with&nbsp;Isotope
category: blog
layout: blog

---

Mr. [Chris Armstrong](http://chris-armstrong.com) is currently developing a very cool inspiration gallery with Isotope. He recently [made this inquiry](https://twitter.com/armstrong/status/39378106003234816):

> when adding items to isotope, is it possible to have them fade in and come from the bottom (instead of the top left)?

You can see what Chris is talking about in the [Infinite Scroll demo](http://isotope.metafizzy.co/demos/infinite-scroll.html). A better effect would be if they were animated from the bottom up, so the new items don't have to traverse the length of the previous content.

It's a issue I had written down for a rainy day, so my thanks go out to Chris to motivate me to find a solution. Here it is...

<iframe style="width: 100%; height: 450px" src="http://jsfiddle.net/desandro/MAjzR/5/embedded/result,js,css,html"> </iframe>

View on jsFiddle: [Isotope - fading in newly appended elements](http://jsfiddle.net/desandro/MAjzR/5/)

This example requires Isotope v1.0.110220. If nothing happens when you click the _Add Items_ button, try going to [http://isotope.metafizzy.co/jquery.isotope.min.js](http://isotope.metafizzy.co/jquery.isotope.min.js) and doing a hard refresh.

There's a lot of cool things going on here. Let's break it down...

``` javascript
var isotopeData = $container.data('isotope'),
```

You can get an instance's options and properties using `.data('isotope')`. This is a perk of using the [jQuery UI widget bridge](http://www.erichynds.com/jquery/using-jquery-ui-widget-factory-bridge/).

``` javascript
applyStyleFnName = isotopeData.applyStyleFnName,
```

`applyStyleFnName` is the either jQuery method -- either `.css()` or `.animate()` -- used on item elements when applying CSS style. It is dependant on the `animationEngine` option and if the browser supports CSS transitions.

``` javascript
newStyle = $container.isotope( 'getPositionStyles', $container.width(), 
  $container.height() );

$.extend( newStyle, isotopeData.options.hiddenStyle );
// apply style
$newItems.css( newStyle );
```

`newStyle` is going to be the positioning, opacity, and scale style for the new items. Here I set the position to the bottom right of the container, using the undocumented `getPositionStyles` method.  This method returns position styles (top/left, or translate) depending on Isotope options and CSS transform support. This allows you to position elements using the same layout logic that the Isotope instance is using.


I get the zero opacity and tiny scale from the Isotope's instance options.  That style gets immediately applied to the new items.

``` javascript
$container.append( $newItems ).isotope( 'appended', $newItems );
// fade new items to full opacity
$newItems[ applyStyleFnName ]( isotopeData.options.visibleStyle, aniOpts);
```

After the new items get appended, the visible style gets applied via `applyStyleFnName`.

The result is just what Chris was asking for. Item elements get animated from the bottom, fading in. The best part being that its leveraging the Isotope instance's options to ensure that it performs consistently well with Isotope across browsers.

Working with Isotope can seem a bit constraining as it seems like you totally have to "buy in" to its functionality. This example demonstrates how you can open up the plugin to get it working for you.

If you have more questions about how to get this working, submit a follow up comment to the [issue on GitHub](https://github.com/desandro/isotope/issues/issue/18).


