const fs = require ("fs");
const utils = require ("daveutils");
const feedlandSocket = require ("feedlandsocket");

function handleMessage (theCommand, thePayload) {
	function nowstring () {
		return (new Date ().toLocaleTimeString ());
		}
	function itemToJson (theItem) {
		var briefObject = new Object ();
		function copyProp (name) {
			if (theItem [name] !== undefined) {
				briefObject [name] = theItem [name];
				}
			}
		copyProp ("id");
		copyProp ("feedUrl");
		copyProp ("title");
		copyProp ("pubDate");
		copyProp ("whenReceived");
		return (utils.jsonStringify (briefObject));
		}
	function handleNewItem (theItem) {
		console.log ("\n" + nowstring () + ": new item == " + itemToJson (theItem));
		}
	function handleUpdatedItem (theItem) {
		console.log ("\n" + nowstring () + ": updated item == " + itemToJson (theItem));
		}
	switch (theCommand) {
		case "newItem": 
			handleNewItem (thePayload.item);
			break;
		}
	}

var config = {
	urlFeedlandSocket: "wss://feedland.com:443/_ws/" //11/3/25 by DW
	};

utils.readConfig ("config.json", config, function () {
	console.log ("\nconfig == " + utils.jsonStringify (config) + "\n");
	const options = {
		urlFeedlandSocket: config.urlFeedlandSocket,
		handleMessage
		};
	feedlandSocket.connect (options);
	});

