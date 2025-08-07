# feedlandSocket

A Node.js package that connects to FeedLand's websocket interface. 

Your app can get notifications for new and updated feed items.

### Background

While FeedLand is reading feeds, it's sending a constant stream of JavaScript objects to each user via websockets.

This is how it updates feeds in realtime. 

This service is also available to applications running in any environment that supports the W3C standard websockets.

### How to use

Download the repo, run <i>NPM install</i> in the folder and then run the app.

`node demo.js`

Every time FeedLand finds a new item, you'll see a message over the websocket pipe with a payload that includes the item and information about the feed it came from. 

### Video demo

I recorded a <a href="https://www.youtube.com/watch?v=_Q-ks3uytZI">video demo</a> showing what it looks like if you'd like to see before downloading and running the software. 

Also includes random commentary from your humble programmer. :-)

