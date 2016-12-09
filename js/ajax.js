(function() {
	var AJAXCommunicator = function() {
		this.GET_EVENTS = 1;
		
		this.sendRequest = function(call, response) {
			var xml = new XMLHttpRequest();
			xml.open("GET", "ajaxResponder.pl", true);
			xml.onload = function(e) {
				if (xml.readyState == XMLHttpRequest.DONE) {
					if (xml.status == 200) {
						var re = xml.response;
						var parsed = JSON.parse(re);
						if (parsed) {
							response(true, parsed);
							return;
						}
					}
					
					response(false);
				}
			};
			
			xml.send();
		};
	};
	
	window.AJAXCommunicator = AJAXCommunicator;
})();