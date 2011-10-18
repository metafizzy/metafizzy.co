---

title: Right-to-left layouts for Isotope
category: blog
layout: blog

---

Developers for Hebrew and Arabic sites can now use Isotope for right-to-left layouts. Take a look at the [right to left test](http://isotope.metafizzy.co/tests/right-to-left.html). To make it happen, you'll need to make a couple simple modifications explained in [Help - Right-to-left layouts](http://isotope.metafizzy.co/docs/help.html#righttoleft_layouts). This feature is made possible by relying on right/top position styles. This consequently disables CSS transform positioning, which comes with the trade-off of sacrificing hardware-acceleration.