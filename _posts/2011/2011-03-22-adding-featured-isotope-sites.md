---

title: Adding featured Isotope&nbsp;sites
category: blog
layout: blog

---

Now that Isotope is crawling out of its infancy, I've started recording some of its more spectacular uses. See the [Isotope Collection on Ember App](http://emberapp.com/desandro/collections/isotope/). Over the weekend, I've integrated this feed into the [Isotope homepage](http://isotope.metafizzy.co). which is pulled in dynamically via [Ember's API](http://support.realmacsoftware.com/kb/ember).

I've only tiptoed around AJAX previously, so this is an awesome win for me. I no longer have to manage the images and mark-up associated with featured examples, as I've previously had to do with Masonry. The latest examples will be readily viewable as soon as I post them to Ember.  Yay internets!

{% highlight javascript %}

var ajaxError = function(){
  $sitesTitle.removeClass('loading').addClass('error')
    .text('Could not load sites using Isotope :(');
};

// dynamically load sites using Isotope from Ember app
$.getJSON('http://api.emberapp.com/users/view/' + 
            'desandro/collections/view/isotope.json?callback=?')
  .error( ajaxError )
  .success(function( data ){
    // proceed only if we have images
    if ( !data.response || !data.response.images ) {
      ajaxError();
      return;
    }
    // successful stuff follows...
  });

{% endhighlight %}

I'm taking advantage of [jQuery 1.5's Promise Interface](http://api.jquery.com/jQuery.getJSON/#jqxhr-object), chaining the `.success()` and `.error()` methods on to `$.getJSON()`. [Rebecca Murphey put together a solid video on the new $.ajax hotness](http://blog.rebeccamurphey.com/a-refreshed-ajax-in-jquery-15) which helped me understand how to use the new methods.

The featured example sites is also an opportunity to show off the [`cellsByRow` layout mode](http://isotope.metafizzy.co/docs/layout-modes.html#cellsbyrow). It's nice because it vertically centers items within rows, allowing items of varying height to flow together within a strict grid.

{% highlight javascript %}

$sitesList.isotope({
  layoutMode: 'cellsByRow',
  cellsByRow: {
    columnWidth: 290,
    rowHeight: 400
  }
});

{% endhighlight %}