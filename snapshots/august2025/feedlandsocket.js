const myVersion = "0.4.1", myProductName = "feedlandSocket";  

const fs = require ("fs");
const utils = require ("daveutils");
const websocket = require ("websocket").w3cwebsocket;

var config = {
	urlSocketServer: "wss://feedland.org/" //4/18/23 by DW 
	};

function wsConnectUserToServer (itemReceivedCallback) {
	var mySocket = undefined;
	function checkConnection () {
		if (mySocket === undefined) {
			mySocket = new websocket (config.urlSocketServer); 
			mySocket.onopen = function (evt) {
				};
			mySocket.onmessage = function (evt) {
				function getPayload (jsontext) {
					var thePayload = undefined;
					try {
						thePayload = JSON.parse (jsontext);
						}
					catch (err) {
						}
					return (thePayload);
					}
				if (evt.data !== undefined) { //no error
					var theCommand = utils.stringNthField (evt.data, "\r", 1);
					var jsontext = utils.stringDelete (evt.data, 1, theCommand.length + 1);
					var thePayload = getPayload (jsontext);
					switch (theCommand) {
						case "newItem": 
							itemReceivedCallback (thePayload);
							break;
						}
					}
				};
			mySocket.onclose = function (evt) {
				mySocket = undefined;
				};
			mySocket.onerror = function (evt) {
				};
			}
		}
	setInterval (checkConnection, 1000);
	}

wsConnectUserToServer (function (thePayload) {
	console.log (new Date ().toLocaleTimeString () + ": title == " + thePayload.theFeed.title + ", feedUrl == " + thePayload.theFeed.feedUrl);
	});
