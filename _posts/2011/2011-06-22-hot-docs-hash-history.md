---

title: Hot docs &amp; hash history
category: blog
layout: blog

---

I spend a lot of time navigating through the docs, checking features and  finding links for support requests. So if I'm having trouble with my own docs, I imagine new users can't be fairing any better.

## Navigation

The first thing you'll notice is a re-done homepage. While the original version did a good job of exhibiting Isotope's features, I found it tough to  navigate to the next page. This new version has navigation and demo clearly separated.

[![Isotope homepage](http://i.imgur.com/mqlpY.png)](http://isotope.metafizzy.co)

The sidebar navigation is now ever-present around the micro site, so you can easily browse from demo to demo.

## Hash history

Now that the push on internal development has cooled off, I took care of a [lingering feature request](https://github.com/desandro/isotope/issues/3). With Ben Alman's superb [jQuery BBQ](http://benalman.com/projects/jquery-bbq-plugin/), you can enable hash history with your Isotope implementation. Mr. Alman is the _the_ jQuery plugin champion. I have considerable respect for his work, as its well documented and thoroughly tested. Bringing our work together is fantastic as his plugins are designed for interoperability. jQuery BBQ takes care of all the hassle of compressing a big ugly object into hash

Hash history is a great feature that allows your users to save the state of the page, so the URL can be bookmarked and shared. You can save all your options: filters, sorts, layout modes, etc. On top of that, you can hit the back button to return to the previous state. Pretty&nbsp;awes.

