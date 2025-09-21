# feedlandSocket

Connects with a FeedLand instance, getting a complete set of new items and updates of feeds as it reads them.

### Background

While FeedLand is reading feeds, it's sending a constant stream of JavaScript objects to each user via websockets.

This is how it updates feeds in realtime. 

This service is also available to applications running in any environment that supports the standard websockets.

### Watch it run

Here's the <a href="http://scripting.com/code/feedlandsocket/demos/browser/index.html">demo app</a> that runs in the browser. 

<img src="https://imgs.scripting.com/2025/09/21/socketScreenShot.png">

You'll see a series of JSON packets flow through a box on the screen.

Open the JavaScript console for more info.

### What's in the repo

A Node.js package that connects to FeedLand's websocket interface. 

Demo apps for hooking into the socket connection from a browser or from a Node app.

### Video demo

I recorded a <a href="https://www.youtube.com/watch?v=_Q-ks3uytZI">video demo</a> showing what it looks like if you'd like to see before downloading and running the software. 

Also includes random commentary from your humble programmer. :-)

