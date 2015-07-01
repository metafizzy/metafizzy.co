---

title: Dropping IE8 and 9 support
category: blog
layout: blog
author_name: Dave
author_url: https://twitter.com/desandro

---

2015 will be the last year Metafizzy supports IE8 and 9. In 2016, we'll release new major versions of our libraries that remove support for the Internet Explorers of yore.

The time has come. [Global browser usage](http://caniuse.com/usage-table) is especially low for both browsers. IE8 is at 2%. IE9 is at 1.5%.

+ [Microsoft ended support for Windows XP in 2014](https://www.microsoft.com/en-us/WindowsForBusiness/end-of-xp-support), [support for IE8 will end in January 2016](https://support.microsoft.com/en-us/lifecycle/search?sort=PN&alpha=internet%20explorer). IE9 will only be supported for Windows Vista.
+ The New York Times [dropped IE8 support in 2014](http://www.nytimes.com/content/help/site/ie8-support.html) and [IE9 support in June this year](http://www.nytimes.com/content/help/site/ie9-support.html)
+ [Ember 2.0 will not support IE8](http://emberjs.com/blog/2015/04/20/ie8-support-update.html). [Read Ember community input on IE support](https://github.com/emberjs/rfcs/pull/45)
+ [Bootstrap 4 will drop support for IE8](http://blog.getbootstrap.com/2014/10/29/bootstrap-3-3-0-released/)
+ [Google Analytics dropped support for IE9 in January this year](http://analytics.blogspot.com/2014/12/keeping-ga-web-experience-modern.html)

IE8 and 9 were the last browsers to have significant feature gaps. Dropping their support will allow a lot of ugly code to be removed. Polyfill libraries can be removed like  [eventie](https://github.com/desandro/eventie), [classie](https://github.com/desandro/classie), and [doc-ready](https://github.com/desandro/doc-ready).

If you still require IE8 and 9 support, previous versions will still be completely available to download and view documentation. The old versions will no longer get bug fixes or improved features, but you can continue using them as long as you like.

We've opened issues to track this change for each library. Follow along:

+ [Isotope dropping IE8 and 9 support](https://github.com/metafizzy/isotope/issues/947)
+ [Flickity dropping IE8 and 9 support](https://github.com/metafizzy/flickity/issues/178)
+ [Packery dropping IE8 and 9 support](https://github.com/metafizzy/packery/issues/281)
+ [Masonry dropping IE8 and 9 support](https://github.com/desandro/masonry/issues/719)
