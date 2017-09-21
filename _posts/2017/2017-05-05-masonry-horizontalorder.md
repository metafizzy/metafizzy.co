---
title: Masonry gets horizontalOrder
image: https://i.imgur.com/vjODpqE.png
blurb: Masonry and Isotope
---

I've added Masonry's first new layout feature in years. [`horizontalOrder` for Masonry](https://masonry.desandro.com/options.html#horizontalorder) and [Isotope](https://isotope.metafizzy.co/layout-modes/masonry.html#horizontalorder) will position items in a Masonry staggered layout, but maintain left-to-right order. Previously, Masonry would discard horizontal order and position items in the closest position to the top. While the first row would have horizontal order: 1, 2, 3; subsequent rows would break the order: 5, 4, 6 ... 9, 7, 8.

![Masonry and left-to-right order](https://i.imgur.com/WQVtdGp.png)

[Try out the demo on CodePen](https://codepen.io/desandro/pen/dWVqmx).

<p data-height="360" data-theme-id="dark" data-slug-hash="dWVqmx" data-default-tab="result" data-user="desandro" data-embed-version="2" data-pen-title="Masonry & Isotope horizontalOrder" class="codepen">See the Pen <a href="https://codepen.io/desandro/pen/dWVqmx/">Masonry & Isotope horizontalOrder</a> by David DeSandro (<a href="http://codepen.io/desandro">@desandro</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

This feature has been [hotly requested over a long time](https://github.com/desandro/masonry/issues/873). For a while, I felt a horizontalOrder feature went against the purpose of Masonry. Masonry is supposed to mess up the horizontal order — that's what makes it Masonry. But recently, I've started relenting over these philosophical stances. If hundreds of people are asking for the same thing, maybe I shouldn't be so stubborn.
