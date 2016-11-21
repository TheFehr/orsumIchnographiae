(function() {
    "use strict";

    var map, timeline;

    function initMap() {
        map = {
            html: document.querySelector("#map"),
            img: document.querySelector("#map").getElementsByTagName("img")[0],
            zoomedIn: false,

            zoomMapIn: function zoomMapIn(e) {
                map.img.width = 5712;
                map.img.height = 2986;
                map.img.style.height = "auto";
                map.html.style.cursor = "zoom-out";
                map.html.scrollTop = e.clientY;
                map.html.scrollLeft = e.clientX;
                map.zoomedIn = true;
            },

            zoomMapOut: function() {
                map.img.removeAttribute("width");
                map.img.removeAttribute("height");
                map.img.style.height = "100%";
                map.html.style.cursor = "zoom-in";
                map.zoomedIn = false;
            }
        };
    }
    
    function initTimeline() {
	    timeline = {
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
		    },
		    
		    resize: function() {
			    timeline.canvas.width = window.innerWidth;
			    timeline.canvas.height = 150;
			    
			    timeline.render();
		    }
	    };
	    window.timeline = timeline;
    }
    
    function loadEventData() {
	    
    }

    window.addEventListener("load", function(loadEvent) {
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
})();
