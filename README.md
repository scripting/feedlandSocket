# feedlandSocket

Connects with a FeedLand instance, getting a complete set of new items and updates of feeds as it reads them.

### Background

While FeedLand is reading feeds, it's sending a constant stream of JavaScript objects to each user via websockets.

This is how it updates feeds in realtime. 

This service is also available to applications running in any environment that supports the standard websockets.

### Watch it run

Here's the <a href="https://socketdemo.feedland.com/?url=wss://feedland.com:443/_ws/">demo app</a> that runs in the browser. 

<img src="https://imgs.scripting.com/2025/09/21/socketScreen2.png">

You'll see a series of JSON packets flow through a box on the screen.

Open the JavaScript console for more info.

### What's in the repo

A Node.js package that connects to FeedLand's websocket interface. 

Demo apps for hooking into the socket connection from a browser or from a Node app.

### Philosophy

I think this is the next way news is distributed, a lot simpler than RSS imho. Just open a connection and let the news flow to you. 

You have to be sure the feeds you want are subscribed to on <a href="https://feedland.com">feedland.com</a>, or another FeedLand instance you want to serve as the backend. 

At this point it's a firehose, you get notification of all new items, and updates to items. Over time we probably will have to have more configuration options.

### Plugins wanted

I'd love to see WordPress plugins <a href="http://scripting.com/2025/11/05.html#a131041">devs</a> see what they can do with this. 

