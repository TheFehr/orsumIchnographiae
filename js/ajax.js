(function() {
	var AJAXCommunicator = function() {
		this.GET_EVENTS = 1;
		
		this.sendRequest = function(call, response) {
			/*var xml = new XMLHttpRequest();
			xml.open("")*/
			
			if (call == 1) {
				response(true, [
					{
						title: "Front auf Russland",
						events: [
							{
								title: "Deutscher Angriff auf die Sowjetunion",
								content: "Jetzt wird's ernst",
								month: 6,
								year: 1941
							},
							{
								title: "Kapitulation der 6. Armee",
								content: "Kapitulation der 6. deutschen Armee im Südkessel und am 02.02. im Nordkessel bei Stalingrad",
								month: 2,
								year: 1943
							}
						]
					},
					{
						title: "",
						events: [
							{
								title: "Landung („Invasion“) der Westallierten in der Normandie",
								content: "Die Alliierten griffen die Aufstellung der Achsenmächten in der Normandie an",
								month: 6,
								year: 1944
							}
						]
					}
				]);
			}
		};
	};
})();