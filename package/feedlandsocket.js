const myVersion = "0.5.1", myProductName = "feedlandSocket";  

const fs = require ("fs");
const utils = require ("daveutils");
const websocket = require ("ws");

var config = {
	urlSocketServer: "wss://feedland.org/" //4/18/23 by DW 
	};

exports.connect = function (userOptions) { //5/25/24 by DW
	var options = {
		flWebsocketEnabled: true,
		urlFeedlandSocket: undefined,
		maxRetries: 100, //when we lose a connection, we try to reconnect this many times
		ctSecsBetwRetries: 10,
		initialCheckTimeout: 100, //5/4/25 by DW
		maxSecsBetwNotifications: 10.1, //a notice on the same id less than x secs apart are considered to be the same one
		flDebugMessages: true,
		handleMessage: function (theCommand, thePayload) {
			switch (theCommand) {
				case "hello":
					console.log ("hello");
					break;
				}
			}
		};
	utils.mergeOptions (userOptions, options);
	
	var recentIds = new Object ();
	function notSeenRecently (id) {
		var flSeen = false;
		function ageOut () {
			var newObject = new Object ();
			for (var x in recentIds) {
				if (utils.secondsSince (recentIds [x]) <= options.maxSecsBetwNotifications) {
					newObject [x] = recentIds [x];
					}
				}
			recentIds = newObject;
			}
		ageOut (); //remove expired ids
		for (var x in recentIds) {
			if (id == x) {
				flSeen = true;
				}
			}
		recentIds [id] = new Date ();
		return (!flSeen);
		}
	
	var ctRetries = 0, idSocketChecker;
	var ctIncomingMessages; //5/25/25 by DW
	
	if (options.flWebsocketEnabled) { //2/8/23 by DW
		var mySocket = undefined;
		function checkConnection () {
			if (mySocket === undefined) {
				mySocket = new websocket (options.urlFeedlandSocket); 
				if (options.flDebugMessages) {
					console.log ("wsConnectUserToServer: socket created");
					}
				mySocket.onopen = function (evt) {
					ctRetries = 0; //5/1/25 by DW -- we got through
					ctIncomingMessages = 0; //5/25/25 by DW -- for debugging
					if (options.flDebugMessages) {
						console.log ("wsConnectUserToServer: socket connection is open");
						}
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
						
						var id; //8/7/25 by DW
						if (thePayload.item === undefined) { //it's an updatedFeed message, probably
							id = thePayload.id;
							}
						else {
							id = thePayload.item.id;
							}
						
						if (notSeenRecently (id)) {
							options.handleMessage (theCommand, thePayload);
							}
						
						}
					};
				mySocket.onclose = function (evt) {
					mySocket = undefined;
					if (ctRetries++ >= options.maxRetries) { //5/1/25 by DW
						clearInterval (idSocketChecker);
						}
					};
				mySocket.onerror = function (evt) {
					console.log ("wsConnectToServer: socket received an error.");
					};
				}
			}
		setTimeout (function () { //5/4/25 by DW
			checkConnection ();
			idSocketChecker = setInterval (checkConnection, 1000 * options.ctSecsBetwRetries);
			}, options.initialCheckTimeout);
		}
	}


