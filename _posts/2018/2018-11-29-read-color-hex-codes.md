---
title: Read color hex codes
blurb: How does a colorblind designer work with color? Not with his eyes! Instead I rely on reading color hex codes. I share my process and related insights into human vision, computer history, and digital color.
image: /img/2018/dot-css2.jpg
---

<div class="fit-video fit-video--16x9">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/eqZqx6lRPe0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I gave the following talk at [dotCSS in Paris on November 8th, 2018](https://www.dotconferences.com/2018/11/david-desandro-read-color-hex-codes). dotCSS is a huge event. A grand stage where the world's leading voices in web development can reveal the most cutting edge advances in the platform. Or not...

I'm colorblind. I learned how to read color hex codes out of necessity. I thought this was something all developers could do, so I was surprised to discover my ability was special. I used my opportunity on stage to share this brain-hack because I think it's something everyone should know.

dotCSS puts together a great show. Not only do they produce high-quality videos of all the talks, but they release them for free. That's rad.

Full transcript of my talk is below. [Video on YouTube](https://www.youtube.com/watch?v=eqZqx6lRPe0). [Slides on Speakerdeck](https://speakerdeck.com/desandro/read-color-hex-codes).

---


<script async class="speakerdeck-embed" data-id="2f5d4ebf304641d5ba8d26560ecc2a67" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

A couple years ago, I discovered I had a special ability. I can read color hex codes.

Color hex codes are the six-digit alpha-numerical codes that we developers use every day to set colors.

My ability is that I can look at a hex code and tell you what that color is.

The reason I can read color codes is not because I'm some super developer. It's the opposite.

_I am colorblind._ I cannot rely on my own natural color vision. When I look at a color, I cannot know for certain what it is unless I have more information. So I learned how to read hex codes out of necessity.

The wild thing is: I thought all developers could do this. My co-workers used hex codes every day. But I was surprised to learn they didn't know the meaning of the characters themselves. To most developers, color hex codes are indecipherable.

I want to fix that. Today, I am going to teach you how to read color hex codes.

I want to teach you, not just because its a fun, developer parlor trick. Understanding hex codes makes you learn more than just hex codes.

Yes, I acknowledge that there are other, better color syntaxes. Now in CSS, we can use `rgb()` and `hsl()`. You might even be a preprocessor wizard, using variables and lighten darken functions. But the hex codes remains the ubiquitous standard.

If you want use the same syntax within CSS, Photoshop,  WYSIWYGs, or native app, you'll be using a hex code. So let's get crackin'!

The process to read a color code takes requires these 5 steps. Let's begin.

The immediate problem with hex codes is that they are optimized for computers, not humans. Hex codes hide their meaning. But we can pull it out.

A standard color hex code is made up of a hash followed by six digits. We'll be working with this code: `#D49B25`.

Those six digits actually represent 3 things: values of the RGB color channel. We can break up the code into three groups.

Now those three two-digit pairs: `D4, 9B, 25`. Those are hexadecimal numbers. That's where the _hex_ in color hex code from. So what is hexadecimal?

When we humans count, we use the decimal numeral system. It is _base-10_. It has 10 characters, 0 though 9. When we count up to 9, we run out of characters, so we add a new digit `1` in front of `0`, then continue counting again with `10, 11, 12`.

The hexadecimal numeral system works the same way, except it is _base-16_. It uses 16 characters: 0 through 9, then A through F.

In hexadecimal, `A` is equal to ten, `F` is equal to fifteen, and `10` is equal to sixteen.
Hexadecimal came to prominence in computer history as it coincided with the standardization of the byte. A byte in binary requires 8 digits of 1’s and 0’s. In hexadecimal, a byte requires only 2 digits.

Hexadecimal is both concise and computer-friendly, thus making a convention for programmers, that we live with to this day.

Now, you don't worry about being able to mathematically convert hexadecimal to decimal.

For our purposes, all you need to know is the relative value of the character.

+ 0 is lowest
+ 8 comes in the middle (like 5 in decimal)
+ A comes after 9
+ F is the highest

Here’s that same idea, but as a line graph.

Let's look at our color code again. Now that we know those characters are numbers, we can simplify them by rounding them to one digit.

So we take the original 6-digit code, and remove every other character.

We get `#D92`. In CSS, this 3-digit code is the called the _shorthand_. 

You're likely already familiar and have seen `#FFF` for white and `#000` for black. The actual value of a shorthand code is made by duplicating the digit for each channel. So `#D92` is technically `#DD9922`. This is a slightly different code the original, but by rounding those numbers into the 3-digit shorthand, it is ideal as it's easier to parse and understand.

Step 1: Done!

Now we have an easy-to-digest form of the code. With our basic understanding of hexadecimal numbers we can visualize a little line graph for the channel values.

`D` is high, `9` is around the middle, `2` is low. And we’ve made our line graph.

This line graph tells everything we need to know about the color. But its in RGB — color mode based around hardware. We need a way to describe color that's human-readable.

Having colorblindness, I've found the best way to understand and describe colors is with the HSL color model.

HSL has three attributes.

+ **Hue** is the pure pigment of a color. 
+ **Saturation** is how vibrant or muted the hue is. 
+ **Lightness** is how light or dark the color is. 

The beauty of the HSL model is provides a rubrik to mix and match words and describe any color in a human-readable way.

+ Hue can be described with _12 color names_.
+ Lightness can be described as _light, middle, or dark_.
+ Saturation can be described as _saturated, washed, muted, or gray_.

So to describe our color, we just need to select the right word for each attribute, and put it together.


To better understand how hues work in the RGB color model, let's take a look at this color wheel.

Digital devices use RGB lights to display colors. Red, Green, and Blue. These are the our primary colors for digital displays. Their color codes make for the simplest line graphs. One channel is high and the other two are low. For example, Red has high R, low G and B. Green has low R, high G, low B.

Secondary colors in RGB are made by combining two primary colors. Their line graphs have two high channels and one low.

Yellow is the combination of Red and Green, so it has has high R and high G, low B. Magenta combines Red and Blue, so it has high R and B, low G.

Tertiary colors in RGB lie in between the primary and secondary colors. Their line graphs have a high, low, and middle channel values.

The hue Azure is in between Cyan and Blue. It has low R, middle G, and high B.

If all the channels have the same value. There isn't a clear hue, and that makes a shade of gray. More on that later.

Each hue has a line graph with a unique shape.

When you look at line graphs for colors that have the same hue, the shape remains the same, even though saturation and lightness may vary.

Here with colors with Azure hue, R is low, G is the in middle, and B is high.

To identify the hue of a color code, we match up its shape to the hue's shape. We do this by looking at the color's relative channel values, not its exact values. What's high, what's middle, what's low.

For our color, we have high R, middle G, low B. That means it has an **orange** hue.

Remembering the graph shapes for these 12 hues is the hardest part of the color-reading process. But its doable by understanding how the primary, secondary, and tertiary colors work together.

We got Hue. Next is Lightness

We can determine the lightness by looking at the total sum of the channel values. In other words, look at where the values generally are in the graph. If the values are closer to the top, the color is closer to white and thus lighter. If the values are closer to the bottom, the color is closer to black and thus darker.

Our color `#D92`, the values are both high and low, so it has **middle lightness**.

Lightness achieved. Finally: Saturation

Saturation is a measure of how vibrant or rich the hue is.

We can determine the saturation of a color by looking at the range of its channel values. The range is the difference between the highest and lowest channel value. The wider the range, the higher the saturation. Colors with small range have low saturation, appearing faded. A color with no saturation is a pure gray.

Mathematically, there's more going on to calculate saturation. But for our purposes, looking at the range works just fine.

With our color, `#D92`, `D` is the highest value, `2` is the lowest. `D` is high. `2` is low. That's a wide range, but not completely wide. So our color has moderate saturation, thus making it a _washed_ color.

Now we have all three attributes for our color

So we can say `#D49B25` is **Middle Washed Orange**.

Let’s put it to the a test. What is `#3A538C`?

We got our 5 steps.

Step 1: get the shorthand by removing the even digits. That gives us `#358`. Now the line graph. 3 is pretty low, 5 is a bit higher, and 8 is higher than 5. Hue comes from shape. `#358` is low R, middle G, high B. That shape matches the hue of **Azure**. For Lightness, 3, 5 & 8 are all low-to-medium numbers. So this color is **dark** . Saturation from range. The difference between 3 & 8 is fairly small. Saturation is **Muted**. So we can say `#3A53EC` is **Dark Muted Azure**.

The last lingering question is what happened to the 3 other even digits? We can think of them as fine-tuning numbers. Let’s look at this code: `#FFF2F0`.

Its 3-digit shorthand would be `#FFF` which is pure white. But that's not white.

Looking at its even digits, we have `F, 2, 0`. On its own, that color would be a red-orange. So together, this color is 90% white and 10% red. So we can identify the whole color as a very faint red.

The even numbers in the six-digit code are useful for subtle desaturated colors, like beiges and pastels. But for the large majority of colors we use in our designs, all we really need is the 3-digit shorthand.

Mailchimp just released their rebrand. And sure enough, their brand colors use the standard six digits. Nearly all these colors can be changed to shorthand with negligible visual differences.

Using shorthand color codes come with several benefits.

Shorthand codes are easy to read as colors. Because there are only three characters, at a glance, you can match up each character to its respective RGB channel. So it's easier to understand what the code represents.

They are easy to remember. I use shorthands for my color palette. I’ve become so familiar with them, that I can list them off the top of my head. Garnet is `#C25`, Gold is `#EA0`, Blue is `#19F`. I don't have to reference a brand guidelines document because I know them by heart.

Shorthands are easy to choose. It’s like a grid for colors. Instead of choosing from 17 million colors, you'd be selecting from 4,096. That's still a lot of colors. But the limitation makes your choices more deliberate, making them easy to choose.

Shorthand codes are easy to change in code. For example with `#D92`:

+ Make it lighter by increasing numbers: `#FB4`
+ Make it darker by deceasing numbers: `#C70`
+ Make it less saturated by bring higher & lower numbers closer together: `#C94`
+ Change hue by changing order of the numbers: `#29D`

I encourage you to go back to your company and change the brand colors to shorthand.  Visually, no one is likely to notice. But if they do, you then have a great opportunity to teach them how to read color codes.

This brings me to my final point

Front-end development is filled with frameworks and tools. React, Webpack, Sass, Babel, Bootstrap. These tools are useful because they allow you to work at a higher level. You don't have to worry about smaller details.

But relying on tools comes at a cost. Because at higher levels, you lose sight of the small details. There's a lot to learn there.

By looking into hex codes, you learn about these related subjects. Hexadecimal numbers, HSL color mode, Shorthand codes. It lead me down this path where its not just about the color code, I'm thinking about larger concepts like workflow and productivity.

So tools are good to get that grand macroscopic view. But its also useful to have a microscopic view. To pick apart every character of code you write. Because when you scrutinize your craft at the smallest levels, you can gain insights that lead back to understanding that big, wide view.


---

<a data-flickr-embed="true"  href="https://www.flickr.com/photos/97226415@N08/45152944094/in/album-72157700343818682/" title="dotCSS 2018"><img src="https://farm5.staticflickr.com/4875/45152944094_2c4a42dd7c_z.jpg" width="640" height="447" alt="dotCSS 2018"></a>

<a data-flickr-embed="true"  href="https://www.flickr.com/photos/97226415@N08/45152943834/in/album-72157700343818682/" title="dotCSS 2018"><img src="https://farm5.staticflickr.com/4832/45152943834_eb9ea7fa39_z.jpg" width="640" height="428" alt="dotCSS 2018"></a>

<a data-flickr-embed="true"  href="https://www.flickr.com/photos/97226415@N08/45152943364/in/album-72157700343818682/" title="dotCSS 2018"><img src="https://farm5.staticflickr.com/4826/45152943364_4a30ef4561_z.jpg" width="640" height="426" alt="dotCSS 2018"></a>

<a data-flickr-embed="true"  href="https://www.flickr.com/photos/97226415@N08/45827479242/in/album-72157700343818682/" title="dotCSS 2018"><img src="https://farm5.staticflickr.com/4838/45827479242_3c60f556ba_z.jpg" width="640" height="391" alt="dotCSS 2018"></a>

<a data-flickr-embed="true"  href="https://www.flickr.com/photos/97226415@N08/45827477122/in/album-72157700343818682/" title="dotCSS 2018"><img src="https://farm5.staticflickr.com/4917/45827477122_859effcc61_z.jpg" width="640" height="428" alt="dotCSS 2018"></a>

<a data-flickr-embed="true"  href="https://www.flickr.com/photos/97226415@N08/44060544280/in/album-72157700343818682/" title="dotCSS 2018"><img src="https://farm5.staticflickr.com/4899/44060544280_5a57c00db8_z.jpg" width="640" height="353" alt="dotCSS 2018"></a>

<script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>

