---

title: What makes for good docs?
category: blog
layout: blog

---

Principal development on [Flickity](http://flickity.metafizzy.co) is all wrapped up. Now is when things get serious: writing the documentation.

The code portion of a library is perhaps one third of its interface. Yes, users will make use of its API, GUI, and maybe peruse the source code. But the majority of a library's surface area is with its documentation. This is how users discover, learn, try and ultimately decide to use a library. Documentation is twice as important as the code it is documenting.

Smaller or more back-end-oriented projects may be able to get away with a README. But for a designer-oriented project like Flickity, a proper microsite is required.

I see documentation as having two goals:

1. Convince users to adopt the product
2. Document how to use the product

It sounds counter-intuitive, but documentation's highest priority is not actually documenting, it's driving adoption. If people are not using the product, then they won't be looking for in-depth API documentation anyway.

At this point, you might have an icky feeling reading this article. It was supposed to be about code documentation. But it's sounding like something gross: _marketing_. I get this icky feeling too. I share the hope that my projects will be judged on their innate merits of their features and cleanliness of their code. Alas, this is an idealization. Those virtuosic qualities do matter, but only in part. You have the consider the end-to-end user experience of how your library gets used.

So how does documentation get people to use your code? **By being useful**. Documentation should have an immediate utility. The sooner a user can access that utility, the more likely they are to adopt it completely.

## The kickoff

I've designed the Flickity docs to prioritize for utility. The first piece of homepage content is a big demo. This demo immediately shows what Flickity can do. Rather than explain its features, it demonstrates them. A feature list could say anything, but a demo is the proof.

[![Flickity homepage](https://i.imgur.com/Ppo66hO.png)](http://flickity.metafizzy.co)

The second piece are quick-start instructions, followed by download links, then by Getting Started instructions. When I look at other sites for libraries, these are the things I immediately search for. I want to learn about the library by trying it out for myself. My intention is to remove any barrier to decision about the library and let the user get their hands on it.

## Structure

As Flickity is the first project I've worked on now that I'm [full-time on Metafizzy](/blog/full-time-fizzy/), I'm trying to be more thoughtful with it. The documentation sites I've created previously have been minimum viable products. I put in the least amount of effort in order to get something acceptable out. Perhaps because of this, the docs sites for [Isotope](http://isotope.metafizzy.co/) and [Packery](http://packery.metafizzy.co/) feel complete, but disjointed. All the content is there, but there's no thread connecting it all.

I realize now that my previous documentation sites are at fault of my own expertise. They are organized by someone who is already familiar with them. Take for example how options and methods are ordered alphabetically. This is useful for someone who knows the API, and wants to look back for some details. But for someone viewing these docs for the first time, this ordering feels random.

To address this haphazardness, I'm implementing a structure that's more _human-readable_. The Flickity docs has content grouped by similarity and ordered by complexity.

Content that's similar goes together. Flickity's options have their own groups like [setup options](http://flickity.metafizzy.co/options.html#setup) and [dragging options](http://flickity.metafizzy.co/options.html#dragging). The options in these groups go together logically. When you read through this page for the first time, you have better context for the kinds of things Flickity can do.

The content is ordered by complexity. Setup options are simpler than dragging options. [Methods](http://flickity.metafizzy.co/api.html#methods) and [events](http://flickity.metafizzy.co/api.html#events) are more complex than options. This ordering helps orient the reader. There's a progression as your read through the docs. The further you progress, the more advanced the content gets. Content that appears later most likely depends on learning from earlier.

Establishing this structure for the docs has been a big help. I feel confident in painting the larger picture for Flickity. I feel comfortable adding more details to the docs, because readers can better understand how the pieces fit together.

Marketing Flickity is still the #1 priority. But once those users do start using Flickity, the docs become my number one defender of time. Good docs allow users to discover, demo, and explore a library, all without personal involvement. The better the docs, the fewer issues will be opened; the fewer emails will need by sent; the more time I will have.

## Previously

If you're just joining us, I'm making a new gallery library! The story thus far...

+ [Initial demos](/blog/initial-demos)
+ [Math time: Resting position](/blog/math-time-resting-position/)
+ [Particle to slider](/blog/particle-to-slider/)
+ [Flickity begins](/blog/flickity-begins/)
+ [Making SVG buttons](/blog/making-svg-buttons/)
+ [The best time](/blog/the-best-time/)
+ [Setting JavaScript functionality with CSS](/blog/setting-javascript-functionality-with-css/)
+ [Front-end testing with QUnit](/blog/front-end-testing-qunit/)
+ [Flickity beta testing](/blog/flickity-beta-testing/)
+ [Lots of files, but only one in my head](/blog/lots-of-files/)
+ [Making features independent with internal events](/blog/making-features-independent-with-internal-events/)
+ [Taps are faster than clicks](/blog/taps-are-faster-than-clicks/)

[Flickity beta is out](http://flickity.metafizzy.co/). Give 'er a flick!
