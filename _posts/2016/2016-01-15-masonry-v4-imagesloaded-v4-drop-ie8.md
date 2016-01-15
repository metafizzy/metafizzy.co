---
title: Masonry v4 and imagesLoaded v4 drop IE8
---

[As promised](http://metafizzy.co/blog/dropping-ie8-9-support/), we are dropping support for IE8 & 9. We have released [Masonry v4](http://masonry.desandro.com) and [imagesLoaded v4](http://imagesloaded.desandro.com), ushering in a new glorious era of modern browser support.

[![Masonry](http://i.imgur.com/SRu49e1.jpg)](http://masonry.desandro.com)

[![imagesLoaded](http://i.imgur.com/KBQszTE.png)](http://imagesloaded.desandro.com)

Dropping older browsers meant dropping excess weight. 700 lines of code were removed for Masonry v4, making it 25% lighter. imagesLoaded dropped 450 lines of code, reducing its size by half.

Both libraries' APIs are backwards compatible with their v3 counterparts. You can upgrade without changing any JavaScript. (If you are using module loader or package manager, you may need to update dependency filepaths as they have changed). Read over [upgrading to Masonry v4 from v3](http://masonry.desandro.com/extras.html#upgrading-from-v3).

If you still need IE8 & 9 or Android 2.3 support, previous versions are still available.

+ [Masonry v3](http://masonry.desandro.com/v3)
+ [imagesLoaded v3](http://imagesloaded.desandro.com/v3)

Next up: Packery v2.
