---

title: Isotope fixed container
category: blog
layout: blog

---

Some of my favorite uses of Isotope or Masonry are instances where the plugins are used subtly. Instead of designing the interface around the plugin, they can be used to facilitate the end result.

Over on Stack Overflow, [Pedalpete was interested in implementing Isotope](http://stackoverflow.com/questions/5100009/relayout-items-with-isotope-doesnt-seem-to-maintain-structure):

> I've been playing about with isotope a bit and have been trying to create a parent container that remains a fixed size, always having 6 smaller items, and reshuffling to fit the 7th larger item. 

The first step is to disable Isotope resizing the container. Set the [`resizesContainer` option](http://isotope.metafizzy.co/docs/options.html#resizescontainer) to `false`.

To produce the intended result, I used sorting with [`fitColumns` layout mode](http://isotope.metafizzy.co/docs/layout-modes.html#fitcolumns) and [updated the sort data](http://isotope.metafizzy.co/docs/methods.html#updatesortdata) whenever a new item was clicked.

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/desandro/S5vAG/2/embedded/result,js,html,css"> </iframe>

View [Isotope - fitColumns in fit container on jsFiddle](http://jsfiddle.net/desandro/S5vAG/2/).