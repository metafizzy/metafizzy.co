---

title: One set of docs to rule them all
category: blog
layout: blog

---

Managing documentation can easily grow to be an overwhelming and tedious undertaking for any developer who open sources her code. Consider how many places docs, demos, and instructions can appear for one project:

+ README
+ within the project source itself
+ GitHub wiki
+ developer's personal site
+ external site just for project
+ project listing page - like [plugins.jquery.com](http://plugins.jquery.com/)

With Masonry v1, my docs had sprawled out to several different locations. To properly update a page, I had to update it in three places: the documentation site, the file in the downloadable project and on another home page. This was a pain as each piece was managed separately: upload via FTP, change a CMS, push via Git. It made me anxious to change anything, lest I tear apart the web of documentation across the various sources.

One of my bigger over-arching goals releasing Isotope was to streamline the documentation. It was a matter of laziness. I just didn't want to bother maintaining multiple sources for related information about my project. Ideally, I wanted to be able to update one source, and have those changes reflected in the various distribution channels -- in both the external project and the downloadable zip of the project.

## Documentation site

My approach now is build the documentation and demos into the project itself, keeping everything in the same place. The project is the doc site is the downloadable zip. This is made possible with [GitHub Pages](http://pages.github.com), which generates a live site from a git repo. All you need to do is add content to a new branch `gh-pages`, and GitHub takes care of the rest for you.

For my purposes, my two branches `gh-pages` and `master` are pretty much identical. `gh-pages` has a couple extra bits just for the live site, like a favicon, 404 page, and analytics scripts. Whenever I make a commit to `master`, I merge it into `gh-pages` and push up both the commits to GitHub.

    # master branch checked out
    git commit
    git checkout gh-pages
    git merge master
    git push

Here's what the commit tree looks like for Masonry.

![Git commits for Masonry](http://i.imgur.com/W3xk1.png)

Note the commit at the bottom of pic, _docs : change analytics back to mint_ which is commited to `gh-pages`, but not `master`.

## Jekyll

GitHub Pages comes built with [Jekyll](https://github.com/mojombo/jekyll/wiki), a static-site generator. This is the **awesome**. Typically, Jekyll is labeled as a blogging framework, but it has several key features that I have merrily put to use for my docs.

Leveraging templates and includes keeps the code across pages consistent and helps you separate proper content from repetitive scaffolding that can bloat your project's source. [Masonry's docs use just one page template](https://github.com/desandro/masonry/blob/61b45b08bf3/_layouts/default.html). The [navigation for every page](https://github.com/desandro/masonry/blob/61b45b08bf3/_layouts/default.html#L26) is dynamically generated.

The Markdown parser allows documentation content to be written in a plain-text format and get generated with proper markup. On top of this, Maruku generates anchor id attributes for header tags, which can be used for in-page linking, i.e. [isotope.metafizzy.co/docs/options.html#filter](http://isotope.metafizzy.co/docs/options.html#filter).

With [Liquid templating](https://github.com/shopify/liquid/wiki/liquid-for-designers) and the ability to add metadata via [YAML front matter](https://github.com/mojombo/jekyll/wiki/YAML-Front-Matter) or [config.yml](https://github.com/mojombo/jekyll/wiki/Configuration), you can iterate through data points and generate long lists of content, without having to explicitly code each one. I found this especially useful for generating the element items in the [Isotope demos](http://isotope.metafizzy.co/demos/elements-complete.html). All the data for each element can be found in [config.yml](https://github.com/desandro/isotope/blob/821095db/_config.yml#L12). This large array is then [iterated through in the page content](https://github.com/desandro/isotope/blob/f04c61160d4e974b7ca3ab0a83af29fc9a4902fd/_posts/demos/2010-12-13-elements-complete.html#L10-13), with each item's markup being produced with a [partial include](https://github.com/desandro/isotope/blob/295253d0cd96c980be3f31a79ef8c6c808d2ae30/_includes/element-partial.html).

Pygments take care of syntax highlighting on the server-side. See [Liquid Extensions](https://github.com/mojombo/jekyll/wiki/Liquid-Extensions) > Code Highlighting at bottom.

## Downloadable zip

The drawback to relying on a templating engine to generate pages is that the source code is not readily viewable for anyone checking out the project or downloading it. The GitHub project Downloads button is pretty much useless for Isotope and Masonry.

I still want to provide a downloadable zip of the project that anyone can open up, start exploring, and tinker around with. My solution was to zip up the Jekyll generated content and host it on my site. I've whittled this task down into a bash script:

``` bash
function zipup() {
  mkdir $1
  # copies Jekyll generated _site
  cp -r _site/ $1
  # zips it up
  zip -r -q $1.zip $1/
  rm -rf $1
  echo "transferring $ZIPFILE to path/to/dir"
  # transfers site.zip to server
  scp $1.zip user@example.com:path/to/dir
  rm $1.zip
}

# in use
zipup isotope-site
```

This script generates the zip files you'll find in [meta.metafizzy.co/files](http://meta.metafizzy.co/files).

## Workflow

Even though the zip doesn't exactly fit in with GitHub pages, this entire setup allows me to make changes to a project, live site, and downloadable file, all without fussing with FTP, a CMS, or server files.

+ Make changes
+ View changes locally by running Jekyll
+ Commit changes to master branch
+ Merge commit to `gh-pages` branch
+ `git push` commits to remote, pushes changes to live site
+ run `zipup` script, updates downloadable zip

I realize that "buying into" GitHub Pages comes with its tradeoffs. There's no support for .htaccess files, which means that re-directs are nigh-impossible. [Post files](https://github.com/desandro/isotope/tree/821095dbc/_posts/demos) need to have a date in their filename. But on the whole, I would recommend this approach for anyone who has their project on GitHub and needs to care of the docs.

All these features help alleviate the tedious nature of writing and maintaining documentation. Instead of producing brief overviews, I feel compelled to write detailed explanations, and to create as many demos as need be. It may seem like an over-abundance of information that might turn off new users. But as support requests come in, it's a great feeling to provide a link to the docs, mentally declaring [RTFM](http://en.wikipedia.org/wiki/RTFM), and being done with it.