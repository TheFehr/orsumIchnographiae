(function() {
    "use strict";

	var movements = [];
    window.map = null;
    window.timeline = null;

    function initTimeline() {
	    window.timeline = {
		    canvas: document.getElementById("timeRender"),
		    ctx: document.getElementById("timeRender").getContext("2d"),
		    padding: 5,
		    contentPadding: 30,
		    arrowWidth: 20,
			arrowHeight: 10,
		    _years: {},
		    _hoveredYear: -1,
		    _selectedYear: -1,

		    render: function() {			
			    var midHeight = timeline.canvas.height / 2.0;
			    var arrowWidth = timeline.arrowWidth;
			    var arrowHeight = timeline.arrowHeight;
			    
			    timeline.ctx.clearRect(0, 0, timeline.canvas.width, timeline.canvas.height);
			    
				timeline.ctx.fillStyle = "black";
			    timeline.ctx.lineWidth = 2;
			    timeline.ctx.beginPath();
			    timeline.ctx.moveTo(timeline.padding, midHeight);
			    timeline.ctx.lineTo(timeline.canvas.width - timeline.padding, midHeight);
			    timeline.ctx.stroke();
			    timeline.ctx.closePath();

			    timeline.ctx.beginPath();
			    timeline.ctx.lineTo(timeline.canvas.width - timeline.padding - arrowWidth, midHeight + arrowHeight);
			    timeline.ctx.lineTo(timeline.canvas.width - timeline.padding - arrowWidth, midHeight - arrowHeight);
			    timeline.ctx.lineTo(timeline.canvas.width - timeline.padding, midHeight);
				timeline.ctx.fill();
			    timeline.ctx.closePath();
			    
			    var years = timeline._years;
			    
			    var firstYear = years.get(0);
				var lastYear = years.get(years.length - 1);
				var totalTimeSpan = lastYear - firstYear;
				var distPerYear = ((timeline.canvas.width - 2 * timeline.contentPadding) - timeline.padding - arrowWidth) / totalTimeSpan;
				window.years = years;
								
				var i = 0;
				for (var year in years) {
					var yearsPassed = year - firstYear;
					var radius = 10;
					
					if ((parseInt(firstYear) + timeline._selectedYear) == year) {
						timeline.ctx.fillStyle = "#de00de";
						timeline.ctx.strokeStyle = "#222";
						radius = 12;
					} else if ((parseInt(firstYear) + timeline._hoveredYear) == year) {
						timeline.ctx.fillStyle = "lightblue";
						timeline.ctx.strokeStyle = "#222";
					} else {
						timeline.ctx.fillStyle = "grey";
						timeline.ctx.strokeStyle = "black";
					}
					
					timeline.ctx.storkeStyle = "black";
					timeline.ctx.beginPath();
					timeline.ctx.arc(yearsPassed * distPerYear + timeline.contentPadding, midHeight, radius, 0, 2 * Math.PI, true);
					timeline.ctx.fill();
					timeline.ctx.stroke();
					timeline.ctx.closePath();
					
					timeline.ctx.fillStyle = "black";
					timeline.ctx.font = "18px Verdana";
					timeline.ctx.fillText("" + year, yearsPassed * distPerYear + timeline.contentPadding - 10, midHeight - 20);
					i++;
				}
		    },

		    resize: function() {
			    timeline.canvas.width = window.innerWidth;
			    timeline.canvas.height = 150;

			    timeline.render();
		    }, 
		    
		    mouseMove: function(e) {
			    var containerWidth = 50;
			    var years = timeline._years;
			    
			    var firstYear = years.get(0);
				var lastYear = years.get(years.length - 1);
				var totalTimeSpan = lastYear - firstYear;
				var distPerYear = ((timeline.canvas.width - 2 * timeline.contentPadding) - timeline.padding - timeline.arrowWidth) / totalTimeSpan;
			    
			    var yearNumb = Math.floor(e.clientX / distPerYear);
			    timeline._hoveredYear = yearNumb;
			    timeline.render();
		    },
		    
		    click: function(e) {
			    var years = timeline._years;
			    
			    if (years[timeline._hoveredYear + parseInt(years.get(0))]) {
				    timeline._selectedYear = timeline._hoveredYear;
				    timeline.render();
			    }
		    }
	    };
	    
	    timeline._years = sortByYear();
	    window.timeline = timeline;
    }

    function loadEventData(callback) {
		(new AJAXCommunicator).sendRequest(0, function(successful, response) {
			if (successful) {
				for (var i in response) {
					var element = response[i];
					var movement = new Movement(element, i);
					movements.push(movement);
				}
				console.dir(movements);
			} else {
				console.error("Can't load events");
			}
			
			callback();
		});
    }
    
    function sortByYear() {
	    var years = {};
	    var len = 0;
	    for (var i in movements) {
		    var movement = movements[i];
		    
		    for (var j in movement.events) {
			    var e = movement.events[j];
			    if (years[e.year]) {
				    years[e.year].push(e);
			    } else {
				    years[e.year] = [e];
				    ++len;
			    }
		    }
	    }
	    
	    years.length = len;
	    
	    years.get = function(i) {
		    var j = 0;
		    for (var year in this) {
			    if (j++ == i) {
				    return year;
			    }
		    }
	    };
	    
	    return years;
    }

    window.addEventListener("load", function(loadEvent) {
        loadEventData(function() {
	        initMap();
			initTimeline();
			
			timeline.resize();
			timeline.render();
			
			window.onresize = timeline.resize;
			
			map.html.addEventListener("click", function(e) {
			    if (!map.zoomedIn)
			        map.zoomMapIn(e);
			    else
			        map.zoomMapOut();
			});
			
			timeline.canvas.addEventListener("mousemove", function(e) {
				timeline.mouseMove(e);
			});
			
			timeline.canvas.addEventListener("mouseup", function(e) {
				timeline.click(e);
			});
        });
    });
})();
