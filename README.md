# [metafizzy.co](https://metafizzy.co)

Metafizzy company site

Built with Gulp and Handlebars.

## Initialize

``` bash
npm install
bower install
```

## Tasks

```
gulp
# builds production site in build/

gulp dev
# builds dev site in build
# starts server for localhost:3000
```

Dev site lists all .css and .js files individually for easy debugging.

After building, the contents of `build/` get synced to S3 with [s3cmd](http://s3tools.org/s3cmd).

## Contents

+ **_posts**: Blog posts. The site was previously built with Jekyll, so posts are still in `_posts`. As with Jekyll, post files have YAML Front Matter and Markdown content.
+ **assets**: Fonts, images, other files
+ **modules**: See modules below
+ **pages**: Page templates
+ **tasks**: Gulp tasks

### Modules

A module is a re-usable view that be used on any page. I'm riffing on [BEM](https://bem.info) methodology. Modules are self-contained and shouldn't muck with one another. A module may have a `.js`, `.css`, and Handlebars `.mustache` template file. All JavaScript and CSS code is contained in modules. CSS is written in [BEM syntax](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/).
