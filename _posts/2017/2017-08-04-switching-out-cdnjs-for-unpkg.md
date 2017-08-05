---
title: Switching out CDNJS for unpkg
blurb: "Why I switched all of Metafizzy's CDN links from CDNJS to unpkg"
---

Last year I switched all of Metafizzy's CDN links from [CDNJS](https://cdnjs.com/) to [unpkg](https://unpkg.com).

For front-end libraries, CDNs are external sites that host and deliver library JavaScript and CSS files. They allow any developer to use external files without having to download and host them. Developers can point directly to the CDN files and getting started coding. In my own work, I use CDN files for [CodePen demos](https://codepen.io/desandro).

## The rise & fall of CDNJS

CDNJS was a blessing when it first came out. Library developers finally had a centralized place where they could host their files for wide-spread usage.

Prior to CDNJS, Google was the key JS CDN player, who only hosted the top tier libraries of the day — jQuery, Dojo, etc. Google's CDN still exists to this today as [Google Hosted Libraries](https://developers.google.com/speed/libraries/). In a peculiar move, CDNJS adopted Google's URL pattern.

```
Google:
https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js

CDNJS:
https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
```

Web 2.0's "ajax" persists to this day.

Ultimately, CDNJS' popularity and core structure led to its biggest pain points. CDNJS' array of libraries is managed via git. Any developer can commit their library's files to the [CDNJS repo](https://github.com/cdnjs/cdnjs) to have them hosted. While git provided a solid mechanism for tracking changes across its libraries, the repo became unwieldy when containing thousands of projects. Currently the repo is [FIVE GIGS](https://github.com/cdnjs/cdnjs/issues/3941). Due to the vast amount of files that have been tracked over the years, the repo is vulnerable to bizarre git errors, like [this case sensitive bug across operating systems](https://github.com/cdnjs/cdnjs/issues/3650). Personally, I am unable to actually work on the repo because of these issues of scale.

CDNJS was created in a previous era, before semver, before npm. It could never completely graduate from it.

## Enter unpkg

[unpkg](https://unpkg.com) was just the solution to overcome CDNJS woes. unpkg is built on top of the npm registry (and originally named "npmcdn"). Every time you publish a version of a library to npm, it saves that version's files to the npm registry as a tarball. The files are already there on npm, but not directly accessible. unpkg, in turn, un-packages that tarball, and caches the files to its store.

The beauty of unpkg is that it requires no additional work for a library author to maintain. If your project is on npm, it's already on unpkg. All the toiling required with other CDNs is completely stepped over.

unpkg has several other features over CDNJS.

**Semver URLs**: You can use semantic versions in the URL. This allows CDN users to get library updates without having to change their URL. For example, I point to major versions of Metafizzy libraries.

```
https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js
=> gets latest 2.x.x version
=> currently returns https://unpkg.com/flickity@2.0.9/dist/flickity.pkgd.min.js
```

**Shorter URLs**: unpkg's URLs are short enough that you can read them at a glance and make sense of them. Compare:

```
unpkg:
https://unpkg.com/flickity@2.0.9/dist/flickity.pkgd.min.js

CDNJS:
https://cdnjs.cloudflare.com/ajax/libs/flickity/2.0.9/flickity.pkgd.min.js
```

**Instant availability**: Once you publish a new version to npm, it's immediately available on unpkg. CDNJS has a lag time of 12-24 hours.

---

CDNs like unpkg provide a necessary role in front-end development. Even with all the progress in package managers, live URLs for JavaScript and CSS files remain straightforward and user-friendly. They allow novice developers to use libraries without having to download anything or deal with package managers. They allow experienced developers to build and share demos without having to worry about bandwidth.

Years ago, I linked directly to Masonry's JS files hosted on [masonry.desandro.com](https://masonry.desandro.com). When I tried switching hosting the Masonry site off of GitHub Pages, I took down my own site. So many Tumblr themes were hot-linking `jquery.masonry.js` that my bandwidth maxed-out instantly.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Turns out a bunch of Tumblrs were hot linking to jquery.masonry.js, which brought down my subdomain. Not sure how to resolve this</p>&mdash; Dave DeSandro (@desandro) <a href="https://twitter.com/desandro/status/344824540356018176">June 12, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

CDNs have allowed Metafizzy to grow. I am indebted to [Michael Jackson](https://twitter.com/mjackson) for creating and maintaining unpkg. It's one of the resources Metafizzy couldn't go without.
