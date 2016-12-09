(function() {
	"use strict";
	
	var Event = function(occurrence) {
		this.title = occurrence.title || "<No title>";
		this.content = occurrence.content || "<No content>";
		this.id = occurrence.id;
		this.year = occurrence.jahr;
		this.month = occurrence.monat;
		this.ort = occurrence.ort;
		this.position = [parseFloat(occurrence.position[0]), parseFloat(occurrence.position[1])];
		this.title = occurrence.title;
	};

	var Movement = function(occurrences, id) {
		if (id === undefined || id === null) {
			console.error("Must have id");
			return;
		}
		
		this.id = id;
		this.events = [];
		for (var i in occurrences) {
			this.events.push(new Event(occurrences[i]));
		}
	};

	window.Movement = Movement;
})();
