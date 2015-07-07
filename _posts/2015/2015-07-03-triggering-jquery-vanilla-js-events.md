---

title: Triggering jQuery and vanilla JS events
category: blog
layout: blog

---

You can now bind to jQuery events in [Isotope](http://isotope.metafizzy.co/), [Packery](http://packery.metafizzy.co/), and [Masonry](http://desandro.masonry.com). The recent upgrades allow you to use standard jQuery event methods `.on()`, `.off`, and `.one()`, rather than using ugly plugin method syntax.

{% highlight js %}
// previous plugin method syntax
// Isotope <= v2.2.0
$grid.isotope( 'on', 'layoutComplete', function() {...})

// standard jQuery event
// Isotope >= v2.2.1
$grid.on( 'layoutComplete', function() {...})
{% endhighlight %}

[View Isotope layoutComplete demo on CodePen](http://codepen.io/desandro/pen/scajv).

This feature is already in [Flickity](http://flickity.metafizzy.co/) and [Draggabilly](http://draggabilly.desandro.com/). It was prime time to port it over to the layout libraries.

## jQuery plugin events

Events are a great API design pattern to add to any library. They enable developers to build functionality on top of a library, without having to add lots of code into a big config object. Take a look at [this Draggabilly demo](http://codepen.io/desandro/pen/LVQqgm), which disables other draggables so that only one can be dragged at a time.

{% highlight js %}
var $draggable = $('.draggable').draggabilly();

// disable other draggabillies on dragStart
$draggable.on( 'dragStart', function( event ) {
  $draggable.filter( function( i, elem ) {
    return elem != event.target;
  }).draggabilly('disable');
});
// re-enable on dragEnd
$draggable.on( 'dragEnd', function() {
  $draggable.draggabilly('enable');
});
{% endhighlight %}

Unfortunately, events are often missing from jQuery plugins. Many plugins stick to the config object pattern for this kind of logic. Here's that same code block re-written using a config object.

{% highlight js %}
var $draggable = $('.draggable').draggabilly({
  onDragStart: function( event ) {
    $draggable.filter( function( i, elem ) {
      return elem != event.target;
    }).draggabilly('disable');
  },
  onDragEnd: function() {
    $draggable.draggabilly('enable');
  }
});
{% endhighlight %}

While this code is more compact, it comes at a cost. Config objects make sense for settings. They align well with novice developers thinking _declaratively_, like writing HTML and CSS. But events are not settings. Events can be turned on and off asychronously. The same event can have multiple listeners. Events can require _programmatic_ thinking. Using events and listeners can open up how to think like a programmer.

Consider a scenario where I want to bind to an event after one event has happened, or a scenario when I want to unbind an event.

{% highlight js %}
$draggable.on( 'dragStart', function() {
  // listen to dragEnd after dragStart
  $draggable.on( 'dragEnd', onDragEnd );
});

function onDragEnd() {
  // on dragEnd after dragStart logic...
  // unbind listener
  $draggable.off( 'dragEnd', onDragEnd )
}
{% endhighlight %}

Re-writing this code with a config object pattern would look ugly. Using the event pattern makes for less complex code that's easier to follow. It exposes a different kind of programmatic logic that's not possible with declarative config objects.

## dispatchEvent method

Looking under the hood, triggering jQuery and vanilla JS events is handled by the `dispatchEvent` method:

{% highlight js %}
/**
 * emits events via eventEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
Widget.prototype.dispatchEvent = function( type, event, args ) {
  // add original event to arguments
  var emitArgs = event ? [ event ].concat( args ) : args;
  // trigger vanilla JS event
  this.emitEvent( type, emitArgs );
  // trigger jQuery event
  if ( jQuery && this.$element ) {
    if ( event ) {
      // create jQuery event
      var $event = jQuery.Event( event );
      $event.type = type;
      this.$element.trigger( $event, args );
    } else {
      // just trigger with type if no event available
      this.$element.trigger( type, args );
    }
  }
};
{% endhighlight %}

`dispatchEvent` emits an event with [EventEmitter for vanilla JS events](https://github.com/Olical/EventEmitter), and creates and triggers a jQuery event. `dispatchEvent` is then used in the widget's logic:

{% highlight js %}
// with Event object
this.dispatchEvent( 'eventName', event, [ arg1, arg2 ] );
// no Event object
this.dispatchEvent( 'eventName', null, [ arg1, arg2 ] );
{% endhighlight %}

Developers can then bind listeners with jQuery or vanilla JS.

{% highlight js %}
// jQuery
$elem.on( 'eventName', function( event, arg1, arg2 ) {
  //...
})

// vanilla JS
widget.on( 'eventName', function( event, arg1, arg2 ) {
  //...
})
{% endhighlight %}

Adding jQuery events is a small feature, but it allows developers to re-use code patterns they are familiar with, which makes Metafizzy libraries more approachable. Compared to the previous syntax, a novice developer can look over event demo code and think "Yeah, I can do that."
