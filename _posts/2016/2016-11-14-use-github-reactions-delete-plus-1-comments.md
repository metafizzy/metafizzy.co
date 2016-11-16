---
title: "Use GitHub reactions, delete +1 comments"
blurb: "On GitHub Issues, +1 comments allow people to add their individual support. But for contributors, they are menacing. Each +1 acts like a drip pinging in the dead of night, reminding you of that leaky faucet that still isn't fixed."
---

On GitHub Issues, +1 comments are a quick way for people to add their individual support. But for contributors, they are menacing. Each +1 acts like a drip pinging in the dead of night, reminding you of that leaky faucet that still isn't fixed.

After [the community called out GitHub on +1 comments](https://github.com/dear-github/dear-github), GitHub implemented [reactions](https://github.com/blog/2119-add-reactions-to-pull-requests-issues-and-comments). Reactions are a nice stop-gap feature. Not only could reactions fill in for +1 comments, but they could provide a wider range of responses — approval, disapproval, happiness, celebration, confusion, affection.

I have since experimented with requesting reactions, asking people to add a reaction to show their interest in the issue. See [Masonry#873 - Maintain left-to-right order](https://github.com/desandro/masonry/issues/873) and [Packery#353 - Add back drag / fit packing behavior from v1](https://github.com/metafizzy/packery/issues/353).

[![Masonry#873](http://i.imgur.com/B1xqVIW.png)](https://github.com/desandro/masonry/issues/873)

Masonry#873 has been wildly successful with this strategy, gaining 71 thumbs-up reactions and no +1 comments. Packery#353 has had lesser success with 40 reactions, but several +1 comments continue to pop up.

I believe the problem deals with social proof. Packery#353 already had +1 comments in its thread, added before GitHub implemented reactions. Users scroll through the thread, see a couple +1 comments, and feel okay adding their own as others have done.

Meanwhile, Masonry#873 never had a +1 comment to begin with. The reactions have the social proof, so people continue to use reactions.

Going forward, I will continue to request people use reactions, but also make it clear that +1 comments will be deleted. My instructions look something like:

> If you would like to see this feature added, please **add a 👍 reaction** to this issue.
>
> Do not add a "+1" comment — they will be deleted. Use reactions instead. Subscribe to this issue using the button in the sidebar.

Reactions carry the intent of +1 comments, but they do not subscribe users to the issue like comments do. So I point to using the subscribe button.

You know the faucet is leaky. Now you don't have to hear the drips.
