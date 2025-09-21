const appConsts = {
	urlFeedlandSocket: "wss://feedland.com:443/_ws/",
	screenname: "scripting",
	catname: "socketdemo",
	}

var myFeedland = undefined;

const whenStart = new Date ();
var ctMessagesReceived = 0;

function howLongSince (when) {
	const secs = secondsSince (when), secsInMinute = 60, secsInHour = secsInMinute * 60, secsInDay = 24 * secsInHour;
	function round (num) {
		return (Math.round (num * 10) / 10)
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
	
	if (theObject.title !== undefined) {
		const titlestring = maxStringLength (theObject.title, 60, false, true);
		$(".divTitle").text (titlestring);
		}
	
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
	function everySecond () {
		const items = (ctMessagesReceived == 1) ? "item" : "items";
		$(".spCount").html (ctMessagesReceived + " new feed " + items + " received.");
		$(".spHowLong").text (howLongSince (whenStart))
		}
	const options = {
		urlFeedlandSocket: appConsts.urlFeedlandSocket,
		}
	myFeedland = new feedlandSockets (options); 
	
	ctMessagesReceived = 0;
	
	self.setInterval (everySecond, 1000); 
	hitCounter (); //9/7/25 by DW
	}
