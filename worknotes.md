#### 9/21/25; 11:00:54 AM by DW

There's a new example app that runs in the browser. It's time to publish the code via the repo. There's still work to do, but we have to get this out now. 

turned the demo folder to demos.

moved the node demo to demos:node

added the new example app to the demos folder at demos:browser

#### 8/7/25; 8:01:33 AM by DW

Now it's more than a demo. 

It's now a NPM package, and includes a demo app.

Changed in dependencies from "websocket" to "ws".

It filters out repeated id's. FeedLand will send duplicate notices. At some point it will stop doing that, but in the meantime, let's catch them at this level. 

#### 4/18/23; 9:18:03 AM by DW 

Feedland now uses WSS, the secure version of websockets, so this code must change. 

