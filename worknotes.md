#### 9/22/25; 10:05:32 AM by DW

Changes to the socket demo app.

* Cname for the demo page: <a href="https://socketdemo.feedland.org/">socketdemo.feedland.org</a>.

* Time units shouldn't have fractions, so 2.1 seconds should become 2 seconds.

* We display the address of the socket server. If you click on the address a dialog appears asking for the new address. Enter the new address carefully because you must get it exactly right. Here are the addresses of three servers you can try out: 

   1. wss://feedland.org/

   2. wss://feedland.social/

   3. wss://feedland.com:443/_ws/

* If the title of an item is undefined, erase the title from the previous item. 

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

