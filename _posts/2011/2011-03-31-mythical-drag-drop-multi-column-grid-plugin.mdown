---

title: The mythical drag n&rsquo; drop multi-column grid plugin
category: blog
layout: blog

---

[Ciprian Mocanu on Stack Overflow asks](http://stackoverflow.com/questions/5500302/a-different-kind-of-jquery-sortable):

> I have elements of different sizes that are arranged somewhat according to a grid (like in the image below) and I want to drag and drop properly those elements. Is there a plugin that would do that? Sortable does not do it properly...

Ah yes, the mythical drag n' drop multi-column grid plugin. This is perhaps the number one requested feature for Masonry and Isotope. Users enjoy the animations and the intelligent layouts. Why not just add a touch of drag n' drop spice to the recipe? Turns out it's a bit easier said than done.

To date, the best implementation I've seen is [Geckoboard](http://geckoboard.com), which uses [jQuery UI Sortable](http://jqueryui.com/demos/sortable/#display-grid). Looking at Masonry, Tyler Boyd made a brave a attempt to merge [jQuery UI Draggable with Masonry](http://tyler-designs.com/masonry-ui/).  But I was never satisfied with the way it functioned.  Dragging an item to a destination feels awkward. Check out my notes in the [open issue for Masonry and Draggable](https://github.com/desandro/masonry/issues/45).

When I was building Isotope, I had considered trying to implement some drag and drop functionality, but eventually decided against it. 

As the layout is a grid, the logic behind determining order is in two dimensions.  This is a complex problem to solve for. When moving an item, the plugin needs to evaluate both X and Y coordinates and how to interpret what elements are laid out after that point, and what elements are laid out after. If the layout is one-dimensional (like a vertical or horizontal list) or even a simplified grid, with items of equal size, the draggable position logic is fairly straight forward (no pun intended).

Clearly, there's a demand for this plugin. I do have some ideas floating in the back of my head as to how to go about it. I'd love to see it come to life, but alas, who has the time? Well if _you_ do, hit me up and maybe we can hash it out. We could be heroes!