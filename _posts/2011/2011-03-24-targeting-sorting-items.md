---

title: Targeting first item after&nbsp;sorting
category: blog
layout: blog

---

> after a sort/filter, I'd like to apply special styling to the item in the new 'first' position. Is there an existing method for getting items by their post-isotope position index (which is now different than their DOM ordering)?

Yes, there's a way!

As [previously mentioned](/blog/isotope-appending-fade-in), you can tap into Isotope's internal properties and settings with `.data('isotope')`. For this issue, we are interested in getting the items within Isotope that correlate to what the user sees.  There are two jQuery objects in the properties `$allAtoms` and `$filteredAtoms`. As you can guess, `$allAtoms` are all the items that Isotope affects, while `$filteredAtoms` are the items that have been filtered and/or sorted.

``` javascript
var $sortedItems = $container.data('isotope').$filteredAtoms;
```

Once you have that jQuery object, you can use it just like any other.  For this example, I am highlighting the appropriate first and last item after a sort.

<iframe style="width: 100%; height: 400px" src="https://jsfiddle.net/desandro/JcHcc/embedded/result,js,html,css"> </iframe>

View [Isotope - target first / last item sorting on jsFiddle](http://jsfiddle.net/desandro/JcHcc/)