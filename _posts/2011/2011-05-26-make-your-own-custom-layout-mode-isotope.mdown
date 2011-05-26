---

title: Make your own custom layout mode for Isotope
category: blog
layout: blog

---

I've just released the docs for [Extending Isotope](http://isotope.metafizzy.co/docs/extending-isotope.html). This topic is one of the kewlest features of Isotope. The core structure of the plugin uses a constructor pattern, similar to how jQuery UI widgets are developed (see Eric Hynds' example in [Using $.widget.bridge Outside of the Widget Factory](http://www.erichynds.com/jquery/using-jquery-ui-widget-factory-bridge/)). Modularity is the principal benefit from this approach. All the functionality within the plugin is derived from the methods of the constructor. Isotope's constructor is `$.Isotope`. If you wish to extend Isotope, you need only to add another method to `$.Isotope.prototype`.

As for the layout modes, each one is comprised of four methods that perform the same roles for their mode, `Reset`, `Layout`, `GetContainerSize`, and `ResizeChanged`. They work together by following the same naming convention, for example, the methods for the _masonry_ layout mode  are:

{% highlight javascript %}

_masonryReset : function() { ... },
_masonryLayout : function( $elems ) { ... },
_masonryGetContainerSize : function() { ... },
_masonryResizeChanged : function() { ... }

{% endhighlight %}

This means you can build your own custom layout mode just by adding these methods. There's no need to fork the project or fiddle with jquery.isotope.js. All of your custom code can live outside of the core Isotope script where you can do as you wish. The layout logic is separate from the other logic like filtering, sorting, inserting, so you can reliably use all of Isotope's features cohesively with your own custom additions.

Take a look at the custom layout mode example, [categoryRows](http://isotope.metafizzy.co/demos/category-rows.html). This example is pretty cool because it breaks the mold and relies on sorting for its layout logic.

## Cut that code

Now that I've opened the kimono, you might consider working the other way and trimming off the fat (mixing metaphors, sorry). For example, if you only use the _masonry_ layout mode, you are free to remove the methods for all the other layout modes.  This can cut down file size by a quarter.

If you do end up extending Isotope, please [get in touch](/#contact). I'd love to see your work!