---

title: New demo - Combination&nbsp;filters
category: blog
layout: blog

---

I just added a new Isotope demo for a highly-requested feature -- [combination filters](http://isotope.metafizzy.co/demos/combination-filters.html). Filtering with a single filter is fairly easy, just pass in a basic selector like `{ filter: '.red' }` or `{ filter: '.tall' }`. But if you wanted to filter for items that are both red and tall, you would need to combine these as one selector: `{ filter: '.red.tall' }`. This demo shows you how to build an interface that will allow for such an interaction.

Check it out in all its Playskool glory!

[![Isotope Combination filters demo screenshot](http://i.imgur.com/nD4KQ.png)](http://isotope.metafizzy.co/demos/combination-filters.html)

The JS isn't too heavy. I'm using an object to store the filter for each group.  Then when a new item is clicked, I update the object, compile an array of the filters, and then merge them together as one string. To allow a filter of nothing for each group, I assign an empty string for that group.

``` javascript
var $container = $('#container'),
    filters = {};

// filter buttons
$('.filter a').click(function(){
  var $this = $(this),
      isoFilters = [],
      prop, selector;
  // store filter value in object
  // i.e. filters.color = 'red'
  filters[ $this.data('group') ] = $this.data('filter');
  
  for ( prop in filters ) {
    isoFilters.push( filters[ prop ] )
  }
  selector = isoFilters.join('');
  $container.isotope({ filter: selector });

  return false;
});
```
