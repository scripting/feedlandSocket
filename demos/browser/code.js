var myVersion = 0.52, myProductName = "socketdemo";

const appConsts = {
	urlFeedlandSocket: "wss://feedland.com:443/_ws/",
	screenname: "scripting",
	catname: "socketdemo",
	}

var appPrefs = {
	urlFeedlandSocket: undefined
	}

var myFeedland = undefined;

const whenStart = new Date ();
var ctMessagesReceived = 0;
var flPrefsChanged = false;

function loadPrefs () { //9/22/25 by DW
	if (localStorage.socketdemo !== undefined) {
		try {
			const jstruct = JSON.parse (localStorage.socketdemo);
			for (var x in jstruct) {
				appPrefs [x] = jstruct [x];
				}
			}
		catch (err) {
			}
		}
	}
function prefsChanged () {
	flPrefsChanged = true;
	}
function savePrefs () {
	localStorage.socketdemo = jsonStringify (appPrefs);
	}
function getFeedlandAddress () {
	var theAddress = getURLParameter ("url");
	if (theAddress == "null") {
		theAddress = (appPrefs.urlFeedlandSocket === undefined) ? appConsts.urlFeedlandSocket : appPrefs.urlFeedlandSocket;
		}
	return (theAddress);
	}
function howLongSince (when) {
	const secs = secondsSince (when), secsInMinute = 60, secsInHour = secsInMinute * 60, secsInDay = 24 * secsInHour;
	function round (num) {
		return (Math.round (num))
		}
	if (secs < secsInMinute) {
		return (round (secs) + " seconds");
		}
	else {
		if (secs < secsInHour) {
			return (round (secs / secsInMinute) + " minutes");
			}
		else {
			return (round (secs / secsInHour) + " hours");
			}
		}
	}
function viewJsontext (theObject) {
	function formatJsonWithTabs (theObject) {
		var jsontext = JSON.stringify (theObject, null, '\t');
		jsontext = jsontext.replace (/^(\t*)\}/gm, '$1\t}'); //move closing braces to align with content inside (add one more tab)
		return (jsontext);
		}
	const jsontext = formatJsonWithTabs (theObject);
	$(".divJsonTextarea").text (jsontext);
	
	const titlestring = (theObject.title === undefined) ? "&nbsp" : maxStringLength (theObject.title, 60, false, true);
	$(".divTitle").text (titlestring);
	
	}

function feedlandSockets (userOptions) { //9/6/25 by DW
	const socketOptions = {
		flWebsocketEnabled: true,
		urlFeedlandSocket: undefined,
		handleMessage
		};
	mergeOptions (userOptions, socketOptions);
	
	var recentIds = new Object ();
	function notSeenRecently (id) {
		var flSeen = false;
		function ageOut () {
			var newObject = new Object ();
			for (var x in recentIds) {
				if (secondsSince (recentIds [x]) <= readerlandConsts.maxSecsBetwNotifications) {
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
	
	function handleMessage (theCommand, thePayload) {
		function getTitle (item) {
			if (item.title === undefined) {
				return (maxStringLength (stripMarkup (item.description), 35));
				}
			else {
				return (item.title);
				}
			}
		
		if (thePayload.item !== undefined) { //debugging
			if (theCommand == "newItem") {
				var wpData = "";
				if (thePayload.item.metadata !== undefined) {
					if (thePayload.item.metadata.wpSiteId !== undefined) {
						wpData = thePayload.item.metadata.wpSiteId + "/" + thePayload.item.metadata.wpPostId;
						}
					}
				console.log (`${new Date ().toLocaleTimeString ()} ${theCommand} ${thePayload.item.feedUrl} ${wpData}`);
				viewJsontext (thePayload.item);
				ctMessagesReceived++;
				}
			}
		}
	
	wsConnectUserToServer (socketOptions); //5/28/25 by DW
	}

function startup () {
	loadPrefs ();
	console.log ("startup: appPrefs == " + jsonStringify (appPrefs));
	
	function everySecond () {
		const items = (ctMessagesReceived == 1) ? "item" : "items";
		$(".spCount").html (ctMessagesReceived + " new " + items + " received.");
		$(".spHowLong").text (howLongSince (whenStart))
		if (flPrefsChanged) {
			savePrefs ();
			flPrefsChanged = false;
			}
		}
	const options = {
		urlFeedlandSocket: getFeedlandAddress (), //9/22/25 by DW
		}
	myFeedland = new feedlandSockets (options); 
	
	ctMessagesReceived = 0;
	
	$(".spFeedlandServer").text (getFeedlandAddress ());
	$(".spFeedlandServer").click (function () {
		console.log ("click");
		
		askDialog ("Address of FeedLand socket server:", appPrefs.urlFeedlandSocket, "", function (url, flcancel) {
			if (!flcancel) {
				if (beginsWith (url, "wss://")) {
					appPrefs.urlFeedlandSocket = url;
					$(".spFeedlandServer").text (url);
					savePrefs (); //must save immediately
					location.reload (); 
					}
				else {
					alertDialog ("Can't set the socket server because it must begin with wss://.");
					}
				}
			});
		});
	
	self.setInterval (everySecond, 1000); 
	hitCounter (); //9/7/25 by DW
	}
