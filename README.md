# feedlandSocket

A demo Node.js app that shows you how to tap into <a href="http://feedland.org/">FeedLand's</a> websocket interface.

### Background

While FeedLand is reading feeds, it's sending a constant stream of JavaScript objects to each user.

This is how it updates feeds in realtime. 

This service is also available to applications running in any environment that supports the W3C standard websockets.

### How to use

Download the repo, run <i>NPM install</i> in the folder and then run the app.

`node feedlandsocket.js`

Every time FeedLand finds a new item, you'll get a message over the websocket pipe with a payload that includes the item and information about the feed it came from. 

The demo app  displays the title of the feed for every new item received, but there's a lot more info in the package that you can use however you like. 

