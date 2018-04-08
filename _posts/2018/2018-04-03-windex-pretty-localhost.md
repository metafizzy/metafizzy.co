---
title: 'Windex: pretty-up your localhost'
blurb: Windex is a little library that creates stylized directory index pages with Apache.
image: /img/2018/windex-thumbnail.png
---

![Windex icons](/img/2018/windex-banner.png)

As 90% of my job is making static websites, I am often looking at directory index pages. You know, those ancient pages with titles like _Index of /projects/_. Long ago, I swore off the ugly unstyled 90's default and chose a higher path.

[Windex is a little library that creates styled directory index pages with Apache.](https://github.com/desandro/windex) Simply put, it allows you to use CSS on your `localhost`. Features include:

+ SVG icons, sized pixel-perfect for 24x24 & multiples thereof
+ View HTML files without extensions: `project/page.html` at `project/page`
+ Nice mobile view with big tap targets

![Windex screenshot](/img/2018/windex-screenshot.png)

<p data-height="400" data-theme-id="dark" data-slug-hash="OvwROP" data-default-tab="result" data-user="desandro" data-embed-version="2" data-pen-title="Windex example" class="codepen"><a href="https://codepen.io/desandro/pen/OvwROP/">View Windex demo on CodePen</a></p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Setting up a practical localhost on macOS

I like to use `localhost` so I can view my projects in `~/projects`. This allows me to create static sites that I can easily view in the browser, without having to start up a server. For example, going to `http://localhost/masonry/sandbox` allows me to view `~/projects/masonry/sandbox`.

Below are instructions to set that up on macOS. _Sorry Windows users, you're on your own here._ This will make a single user's folder viewable for all users. [For separate users folders like `localhost/~username`, view these instructions.](https://discussions.apple.com/docs/DOC-3083)

---

Open `/etc/apache2/httpd.conf` in your text editor. Making changes to this file will require administrator access. Change the following lines (line numbers may vary in your file):

**Line 169:** Enable `mod_rewrite`. This enables `.htaccess` files to rewrite URLs.

``` apache
LoadModule rewrite_module libexec/apache2/mod_rewrite.so
```

**Lines 238-239:** Change `DocumentRoot` and subsequent `Directory` to your desired directory. This sets `localhost` to point to the directory.

``` apache
DocumentRoot "/Users/username/projects"
<Directory "/Users/username/projects">
```

**Line 252:** Within this `<Directory>` block, add `Indexes` to `Options`. This enables file index view.

``` apache
    Options FollowSymLinks Multiviews Indexes
```

**Line 260:** Change `AllowOverride` value to `All`. This enables `.htaccess` files.

``` apache
    AllowOverride All
```

That block should look like:

``` apache
DocumentRoot "/Users/username/projects"
<Directory "/Users/username/projects">
    # Possible values for the Options directive...
    Options FollowSymLinks Multiviews Indexes
    MultiviewsMatch Any

    # AllowOverride controls what directives...
    AllowOverride All

    # Controls who can get stuff from this server.
    Require all granted
</Directory>
```

In Terminal, start or restart `apachectl`.

``` sh
sudo apachectl restart
```

View [http://localhost](http://localhost) in a browser. You'll should see the index page for `~/projects`. Without Windex, it's ugly, but it works. With Windex, it's pretty.

If you messed up `httpd.conf`, you can replace it with its original at `/etc/apache2/original/httpd.conf`.

## Viewing on other devices on macOS

You can view this `localhost` on another device like a phone.

1. Open **System Preferences**. Select **Sharing**.
2. Change **Computer name** to something rad, like **thunderclaw**, if you haven't already.
3. Enable **File sharing**.

Now, you can view `http://thunderclaw.local` on another device if you are on the same Wi-Fi.

---

[Windex](https://github.com/desandro/windex) is the one tool I use every day. Originally created in 2010, it is one of my first open-source projects. Before this recent overhaul, I had been using that first version for years, which had iPhone v1 glossy buttons. Let's see if this version lasts me until 2026.
