---
title: Draggabilly v3.0.0 released
image: /img/metafizzy-logo-thumbnail-blue.png
blurb: Draggabilly brings ES2018 syntax and is 500 LOC smaller
---

Today, I released a new major version of [Draggabilly, the draggable vanilla JS library](https://draggabilly.desandro.com), v3.0.0. Browser support for Internet Explorer has been dropped. JavaScript code has been written with ES2018 features. `draggabilly.pkgd.js` is now 500 lines-of-code smaller. Changes include:

- ❌ BREAKING - Dropped AMD / RequireJS support
- ❌ BREAKING - Dropped IE10 & IE11 support
- 🛠 Updated JS code to ES2018. 
- 📦 Used Unidragger v3. Removed Unipointer
- 🔔 Set `handle` to _Element_ or _Array_ or _NodeList_.
- 🐞 Allowed to scroll on element when dragging is disabled. Fixed bug #189
- 🛠 Checked for `window` for server-size rendering environments
- 🛠 Allowed to trigger `dragEnd` to stop dragging. #177

If you use Draggabilly, please update and report back if you run into any issues. If you don't use Draggabilly — [give it a whirl](https://draggabilly.desandro.com)!

I've been using the holiday break to dip back in to Metafizzy. This work on Draggabilly paves the road for a similar major version update to Flickity.
