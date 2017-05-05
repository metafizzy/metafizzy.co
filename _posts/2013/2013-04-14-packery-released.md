---

title: Packery released
category: blog
layout: blog

---

Packery, the bin-packing layout library, is out. Packery is the second product from Metafizzy. We now have a product line.

[packery.metafizzy.co](http://packery.metafizzy.co)

[![packery site](https://i.imgur.com/LVUd29Y.png)](http://packery.metafizzy.co)

> Packery is a JavaScript layout library that uses a bin-packing algorithm. This is a fancy way of saying "it fills empty gaps." Packery layouts can be intelligently ordered or organically wild. Elements can be [stamped](http://packery.metafizzy.co/options.html#stamped) in place, [fit](http://packery.metafizzy.co/methods.html#fit) in an ideal spot, or [dragged](http://packery.metafizzy.co/draggable.html) around.

Packery is the successor to [Isotope](http://isotope.metafizzy.co) and [Masonry](http://masonry.desandro.com). Together, they make a wonderful family of dynamic layout libraries. This is an important distinction. Packery was not created in a vaccuum. It is not a complete innovation. Packery was developed out of Isotope, and Masonry before it. As I see it, I've been working on this one problem -- layouts with JS -- for four years.

Packery resolves some of the more recent issues with Masonry and Isotope and their support for responsive layouts. [Sizing options can accept elements](http://packery.metafizzy.co/options.html#element-sizing), which allows you determine the size of the option by controlling its size in CSS. Eventually, I'd like to port over this and other solutions developed in Packery to Masonry and Isotope.

## The algorithm

The cornerstone of this project is the bin-packing algorithm. That algorithm was taken from a white paper, [A Thousand Ways to Pack the Bin -- A Practical Approach to Two-Dimensional Rectangle Bin Packing](http://clb.demon.fi/files/RectangleBinPack.pdf), by Finish developer [Jukka Jylänki](http://clb.demon.fi/) (shared with me by Wes Dimiceli. Thank you so much Wes). The paper discusses several algorithms for essentially fitting lots of rectangles into a much bigger rectangle. The Packery algorithm is based off of Jylänki's Maximal Rectangles algorithm.

![maximal rectangle algorithm](https://i.imgur.com/kFvd9n5.png)

![maximal rectangle algorithm](https://i.imgur.com/zf1Oj0j.png)

How it works is not that fascinating (if you're interested, [read the paper](http://clb.demon.fi/files/RectangleBinPack.pdf)), but what it provides is delicious. This algorithm was the key to unlocking some of Masonry's most fantasized features: dragging, and filling in gaps. It opens up new possibilities, like [fitting in expanded items](http://packery.metafizzy.co/methods.html#fit) and [stamping other elements in place](http://packery.metafizzy.co/options.html#stamped).

## Bower

Packery uses vanilla JavaScript and no jQuery whatsoever. Years ago, it was impossible to get anything done without jQuery. Modern browser platforms have evolved so much, that jQuery's feature-set is no longer a must have.

That's not to say Packery is lightweight. In order to fill-in all the features that jQuery would provide, I had to go and either find or build each component. Packery utilizes several smaller libraries:

+ [desandro/get-size](https://github.com/desandro/get-size) get size measurements of elements
+ [Wolfy87/EventEmitter](https://github.com/Wolfy87/EventEmitter) enables custom event emitting
+ [desandro/jquery-bridget](https://github.com/desandro/jquery-bridget) turns a JS constructor into a working jQuery plugin

[Bower](http://twitter.github.io/bower/) makes this component-ized development possible. By encapsulating each feature-set in its own micro-library, a developer can focus on fulfilling well-defined libraries. Packery just handles the layout. getSize just handles measuring sizes. EventEmitter just handles event emitting. As each component is separate, they can built on top of one another as load-bearing structures of other libraries.

As Bower is still in v0.x development, in order to make Packery, [there was work to be done to Bower](https://github.com/twitter/bower/commits?author=desandro). 2013 is going to be a big year for Bower. I hope Packery helps Bower make it big.

You can install Packery with Bower.

    bower install packery

---

I am excited for what's to come. Packery layouts have tremendous potential for innovation for web layouts. But there's a danger that comes with changing the rules so much. What will happen now that developers have their [mythical drag n' drop multi-column grid plugin](/blog/mythical-drag-drop-multi-column-grid-plugin/)? I hope good things. But once these tools are out in wild, who knows how they will be used.
