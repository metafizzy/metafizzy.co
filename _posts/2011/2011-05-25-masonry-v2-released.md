---

title: Masonry v2.0 released
category: blog
layout: blog

---

I'm happy to announce that [jQuery Masonry](http://masonry.desandro.com), everyone's favorite dynamic layout resource, has received a full v2.0 revision and is ready for public consumption.

## What's new

+ The architecture of the plugin is built around a constructor pattern, [similar to jQuery UI's widgets](http://www.erichynds.com/jquery/using-jquery-ui-widget-factory-bridge/). This provides for plugin-specific [methods](http://masonry.desandro.com/docs/methods.html) and maintaining state of the plugin instance.
+ `isFitWidth` option to enable [centered layout](http://masonry.desandro.com/demos/centered.html)
+ `isRTL` option for [right-to-left layouts](http://masonry.desandro.com/demos/right-to-left.html) for Arabic and Hebrew
+ Better performance. My own basic tests yielded performance boosts of 30-40%
+ Sexy animation appending content with the `isAnimatedFromBottom` flag in `appended` method, as seen in the [Infinite Scroll demo](http://masonry.desandro.com/demos/infinite-scroll.html)
+ [Easy prepending](http://masonry.desandro.com/demos/adding-items.html) with `reload` method
+ Includes `imagesLoaded` plugin to easily [deal with images](http://masonry.desandro.com/demos/images.html). No more relying on `$(window).load()`
+ [`gutterWidth` option](http://masonry.desandro.com/demos/gutters.html)
+ [Downloadable docs and demos](http://meta.metafizzy.co/files/masonry-site.zip)

## Updating from v1

Masonry v2.0 adds new features, performs better and resolves several lingering issues with v1.0. Everyone is recommended to update.

Updating from v1 is fairly easy. The general functionality and basic options of the plugin remains the same.

``` javascript
$('#container').masonry({
  itemSelector: '.item',
  columnWidth: 240
});
```

Here are the changes you need to be aware of when updating:

+ `animated` option has been renamed as `isAnimated`
+ `resizable` option has been renamed as `isResizable`
+ `appendedContent` option has been replace by the [`appended` method](http://masonry.desandro.com/docs/methods.html#appended)
+ `savedOptions` and `singleMode` options have been removed
+ Filtering with Masonry is now unsupported. Use [Isotope](http://isotope.metafizzy.co) instead, which handles filtering significantly better.
+ Do NOT use `$(window).load()` to resolve loading media like images. See [Help: Unloaded media and overlapping](http://masonry.desandro.com/docs/help.html#unloaded_media_and_overlapping)

## Development

When I was developing the first version of Masonry in 2009 and 2010, I was learning jQuery at the same time. Consequently, the code was cobbled together with logic that worked okay, but was ultimately not flexible or interoperable. v2 was an opportunity to start fresh and build a plugin that was maintainable and extendable.

Masonry v2.0 is a complete from-the-bottom-up revision of the script and docs. The development effort was started back in October 2010, when I had discovered the revised [jQuery Plugins Authoring](http://docs.jquery.com/Plugins/Authoring) tutorial by [Ralph Holzmann](http://twitter.com/ralphholzmann/status/24135490871). The tutorial revealed how to build [methods into the plugin](http://docs.jquery.com/Plugins/Authoring#Plugin_Methods) and [maintain state](http://docs.jquery.com/Plugins/Authoring#Data). As I hacked away on the script, it became clear that I would be able to develop another similar plugin that had even bigger functionality. That plugin became [Isotope](http://isotope.metafizzy.co). For the past seven months, my plugin development bandwidth has been devoted on Isotope, thus leaving Masonry dormant.

A couple weeks ago, I felt that Isotope was in a good place and so it was time to give Masonry the proper revision it deserved. With all the development put into Isotope, I took Isotope as a template and worked backwards, reducing it to leave Masonry's core functionality.

In addition to revising the script, I upgraded the documentation to use [Jekyll](http://jekyllrb.com) so they could be easily hosted on [GitHub Pages](http://pages.github.com). This makes my life a lot easier as I can leverage templating for building the markup. As it's integrated into GitHub, I now only have to update one code base instead of three.

Masonry has always been my most prolific resource and so it holds a sweet spot in my developer's heart. It didn't feel right leaving my baby inactive for so long (in Internet time). I'm pretty happy being able to release v2.0. I can rest assure that are getting a rock-solid resource and I'll be better able to improve upon it moving forward.

