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

		    render: function() {			
			    var midHeight = timeline.canvas.height / 2.0;
			    var arrowWidth = 20;
			    var arrowHeight = 10;

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
			    
			    var years = sortByYear();
				console.dir(years);
				var distPerPoint = (timeline.canvas.width - timeline.padding - arrowWidth) / years.length;
				console.log("dist: "+ years.length);
				
				var i = 0;
				for (var year in years) {
					timeline.ctx.beginPath();
					timeline.ctx.arc(i * distPerPoint, midHeight, 10, 0, 2 * Math.PI, true);
					timeline.ctx.fill();
					timeline.ctx.closePath();
					i++;
				}
		    },

		    resize: function() {
			    timeline.canvas.width = window.innerWidth;
			    timeline.canvas.height = 150;

			    timeline.render();
		    }
	    };
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
	    for (var i in movements) {
		    var movement = movements[i];
		    
		    for (var j in movement.events) {
			    var e = movement.events[j];
			    if (years[e.year]) {
				    years[e.year].push(e);
			    } else {
				    years[e.year] = [e];
			    }
		    }
	    }
	    
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
        });
    });
})();
