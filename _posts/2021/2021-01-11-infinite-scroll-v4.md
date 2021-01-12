---
title: Infinite Scroll v4 released
image: https://infinite-scroll.com/img/infinite-scroll-illo.png
blurb: Hot new major version of the JavaScript plugin to automatically add the next page on scroll.
---

[![Infinite Scroll v4 screenshot](/img/2021/inf-scroll-screenshot.png)](https://infinite-scroll.com)

This week, I released the new major version of [Infinite Scroll, v4](https://infinite-scroll.com). New features include:

- [fetch() API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) makes requests
- [`loadNextPage`](https://infinite-scroll.com/api.html#loadnextpage) returns a Promise
- [`fetchOptions`](https://infinite-scroll.com/options.html#fetchoptions) set headers and fetch options
- 15% smaller filesize
- ES2018 syntax and features

[Give Infinite Scroll v4 a look right here.](https://infinite-scroll.com)

Infinite Scroll v4 is largely backwards compatible with v3. [Upgrading to v4](https://infinite-scroll.com/extras.html#upgrading-from-v3) is no sweat. Breaking changes include:

- replaced `responseType` option with [`responseBody`](https://infinite-scroll.com/options.html#responsebody). This effects loading JSON.
- Internet Explorer and Android 4 support dropped.
- Removed RequireJS support and AMD export.

<div class="fit-video fit-video--16x9">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/Eh05eGTJeK0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

A lot of work went into improving the infrastructure around around the plugin. JS code is linted with [ESLint](https://eslint.org). Testing is now done via command line with [Puppeteer](https://pptr.dev). Both these improvements allow for automated testing with GitHub Actions, allowing for integrated testing on commits and Pull Requests (take a look at the [`workflows/nodejs.yml`](https://github.com/metafizzy/infinite-scroll/blob/v4.0.1/.github/workflows/nodejs.yml)).

Infinite Scroll is the oldest piece of software I support, dating back to [Paul Irish’s original release in 2008](https://www.paulirish.com/2008/release-infinite-scroll-com-jquery-and-wordpress-plugins/). Not many software companies can boast that kind of longevity. I’m proud to be able to keep it going all these years.

I chose to upgrade Infinite Scroll as it is less popular, making it a good testing ground for new development.  I’ve laid the groundwork to start tackling the bigger plugins next: Isotope & Flickity.
