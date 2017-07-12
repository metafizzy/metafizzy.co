---
title: Infinite Scroll v3 un-breaks the back button
blurb: All new Infinite Scroll upholds URLs by changing them as you scroll. It's back button & refresh button friendly.
image: https://infinite-scroll.com/img/infinite-scroll-illo.png
---

[All new Infinite Scroll](https://infinite-scroll.com) upholds URLs by changing them as you scroll. It's back button & refresh button friendly. I'm delighted to have finally resolved this big pain point.

<blockquote class="twitter-video" data-lang="en"><p lang="en" dir="ltr">All new Infinite Scroll upholds URLs by changing them as you scroll. Back &amp; refresh button friendly <a href="https://t.co/vkf942fMur">https://t.co/vkf942fMur</a> <a href="https://t.co/NbLw66XR6N">pic.twitter.com/NbLw66XR6N</a></p>&mdash; Metafizzy (@metafizzyco) <a href="https://twitter.com/metafizzyco/status/880101419772149760">June 28, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## Backstory

Infinite Scroll works by adding the next page to the current page. This behavior allows users to continue browsing the site, without having to be disrupted with a full page load. But it came at a cost. By adding in new pages, the page content would not match up with the page URL. Although you would looking at content from `example.com/page/4`, the browser URL would still be on `example.com`.

This URL mismatch broke how browsers should work. When a user would re-visit an infinitely-scrolled site, their position would be on the first page, not where they previously were. It broke both the back button and the refresh button. Several developers have addressed this problem over the years:

+ [Screw Hashbangs: Building the Ultimate Infinite Scroll](http://tumbledry.org/2011/05/12/screw_hashbangs_building) - Alex Micek
+ [Infinite Scroll + HTML5 History API](http://warpspire.com/experiments/history-api/) - Kyle Kneath
+ [Infinite Scrolling that Works](https://eviltrout.com/2013/02/16/infinite-scrolling-that-works.html) - Robin Ward
+ [Issue #337 - Scrolling progress should be persisted](https://github.com/metafizzy/infinite-scroll/issues/337)

## Resolution

Infinite Scroll v3 resolves this issue with the [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API). Infinite Scroll keeps track of where new pages are located. As you scroll, Infinite Scroll will use `replaceState` to update the URL to match the current page. When you scroll down from the home page `example.com` to `example.com/page/2`, the URL will change to match. And if you scroll back up to `example.com`, the URL will change back. This feature is enabled by default with the [`history` option](https://infinite-scroll.com/options.html#history).

[Try out the full page demo](https://infinite-scroll.com/demo/full-page/) and watch the URL.

This new feature allows users to maintain their scroll position. They can hit the refresh button or visit other pages and hit back. They'll end up back on the page where they left off and you can start scrolling again. This behavior is enabled by another new feature of Infinite Scroll v3: starting from subsequent pages (not just from page 1, but page 2, 3, ...).

Infinite Scroll is so old that the History API didn't actually exist when it was in development years ago. Upholding URLs brings Infinite Scroll back to former glory as a first-class plugin.
