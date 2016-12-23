(function() {
	"use strict";
	var movements = [];
	var gMap = null;
	var openedInfoWindow = null;
	var isDark = false;
	window.map = null;
	window.timeline = null;

	function initTimeline() {
		window.timeline = {
			canvas: document.getElementById("timeRender"),
			ctx: document.getElementById("timeRender").getContext("2d"),
			padding: 10,
			contentPadding: 30,
			arrowWidth: 20,
			arrowHeight: 10,
			_years: {},
			_hoveredYear: -1,
			_selectedYear: -1,
			_activeMarkers: [],
			_activePoligone: [],
			render: function() {
				var midHeight = timeline.canvas.height / 2.0 + 10;
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
					timeline.ctx.fillStyle = isDark ? "white" : "black";
					timeline.ctx.font = "18px Verdana";
					timeline.ctx.fillText("" + year, yearsPassed * distPerYear + timeline.contentPadding - 10, midHeight - 20);
					i++;
				}
			},
			resize: function() {
				timeline.canvas.width = window.innerWidth;
				timeline.canvas.height = 100;
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
			mouseLeave: function(e) {
				timeline._hoveredYear = -1;
				timeline.render();
			},
			click: function(e) {
				var years = timeline._years;
				if (years[timeline._hoveredYear + parseInt(years.get(0))]) {
					timeline._selectedYear = timeline._hoveredYear;
					timeline._hoveredYear = -1;
					timeline.render();

					var eventsListUL = document.getElementById("eventsList").children[1];
					eventsListUL.innerHTML = "";


					for (var j in timeline._activeMarkers) {
						var marker = timeline._activeMarkers[j];
						marker.setMap(null);
					}

					for (var k in timeline._activePoligone) {
						var poligone = timeline._activePoligone[k];
						poligone.setMap(null);
					}

					timeline._activeMarkers = [];
					var year = timeline._years[parseInt(timeline._years.get(0)) + timeline._selectedYear];
					document.getElementById("eventsList").children[0].innerHTML = parseInt(timeline._years.get(0)) + timeline._selectedYear;
					for (var i in year) {
						var movement = year[i];
						var path = [];
						for (var j in movement.events) {
							var event = movement.events[j];

							var li = document.createElement("li");
							li.appendChild(document.createTextNode(event.title));
							eventsListUL.appendChild(li);

							if (movement.events.length > 1)
								path.push(new google.maps.LatLng(event.position[0], event.position[1]));

							var monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
							var d = new Date();
							d.setMonth(event.month - 1);
							var contentString = 
							'<div id="content" style="color: black">' + 
							 '<div id="siteNotice">' + 
							  '<p>' + event.ort + ': ' + monthNames[d.getMonth()] + ', ' + event.year + '</p>' + 
							 '</div>' + 
							 '<h1 id="firstHeading" class="firstHeading">' + event.title + '</h1>' + 
							 '<div id="bodyContent">' + 
							  '<p>' + event.content + '</p>' + 
							 '</div>' + 
							'</div>';
							var infowindow = new google.maps.InfoWindow({
								content: contentString
							});
							var marker = new google.maps.Marker({
								position: new google.maps.LatLng(event.position[0], event.position[1]),
								map: gMap,
								title: event.title
							});
							
							var clickHandler = function(marker, infowindow, li) {
								if (openedInfoWindow) {
									openedInfoWindow.close();
								}

								infowindow.open(gMap, marker);
								gMap.panTo(marker.getPosition());
								openedInfoWindow = infowindow;

								var children = eventsListUL.children;
								for (var i = 0; i < children.length; ++i) {
									children.item(i).style.fontWeight = "normal";
								}

								li.style.fontWeight = "bold";
							};
							
							marker.addListener('click', (function(marker, infowindow, li) {
								return function() {
									clickHandler(marker, infowindow, li);
								};
							})(marker, infowindow, li));

							li.addEventListener("click", (function(marker, infowindow) {
								return function(e) {
									clickHandler(marker, infowindow, e.target);
								};
							})(marker, infowindow));

							timeline._activeMarkers.push(marker);
						}
						if (path.length > 0) {
							var lineSymbol = {
						    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
						  };

							var movePath = new google.maps.Polyline({
								path: path,
								geodesic: true,
								strokeColor: '#FF0000',
								icons: [{
						      icon: lineSymbol,
						      offset: '100%'
						    }],
								strokeOpacity: 1.0,
								strokeWeight: 4
							});

							animateLineIcon(movePath);

							movePath.setMap(gMap);
							timeline._activePoligone.push(movePath);
						}
					}
				}
			}
		};
		timeline._years = sortByYear();
		window.timeline = timeline;
	}


	function animateLineIcon(line) {
			var count = 0;
			window.setInterval(function() {
				count = (count + 1) % 200;

				var icons = line.get('icons');
				icons[0].offset = (count / 2) + '%';
				line.set('icons', icons);
		}, 20);
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
			var e = movement.events[0];
			if (years[e.year]) {
				years[e.year].push(movement);
			} else {
				years[e.year] = [movement];
				++len;
			}
		}
		console.dir(years);
		years.length = len;
		years.getWithDeltaFromFirstYear = function(i) {
			var start = true;
			var lastYear = 0;
			for (var year in this) {
				year = parseInt(year);
				if (start == true) {
					lastYear = year;
					start = false;
				}
				if ((year - lastYear) == i) {
					return year;
				}
				lastYear = year;
			}
		};
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


	function sortByMoveId($events){
			eventout = array();
			for (var i in $events){
				event = events[i];




			}
	}


	function zoomMap(zoomIn) {
		if (zoomIn) {
			gMap.setZoom(Math.min(Math.max(gMap.zoom + 1, 0), 21));
		} else {
			gMap.setZoom(Math.min(Math.max(gMap.zoom - 1, 0), 21));
		}
	}

	function toggleMap() {
		if (gMap.getMapTypeId() == google.maps.MapTypeId.ROADMAP) {
			gMap.setMapTypeId(google.maps.MapTypeId.HYBRID);
			isDark = true;
		} else {
			gMap.setMapTypeId(google.maps.MapTypeId.ROADMAP);
			isDark = false;
		}
		
		if (isDark) {
			document.body.className = "dark";
		} else {
			document.body.className = "";
		}
		
		timeline.render();
	}

	function updateCoordsLabel() {
		var coords = gMap.getCenter();
		var lat = coords.lat();
		var lng = coords.lng();
		var fullLat = Math.floor(lat);
		var latSeconds = ((lat - fullLat) * 60).toFixed(1);
		var fullLng = Math.floor(lng);
		var lngSeconds = ((lng - fullLng) * 60).toFixed(1);
		document.getElementById("coords").innerHTML = fullLat + "° " + latSeconds + "'  N | " + fullLng + "° " + lngSeconds + "' W";
	}
	window.addEventListener("load", function(loadEvent) {
		loadEventData(function() {
			initTimeline();
			timeline.resize();
			timeline.render();
			window.onresize = timeline.resize;
			var myOptions = {
				zoom: 4,
				center: new google.maps.LatLng(50.0, 9.9),
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				disableDefaultUI: true
			};
			gMap = new google.maps.Map(document.getElementById("map"), myOptions);
			window.gMap = gMap;

			timeline.canvas.addEventListener("mousemove", function(e) {
				timeline.mouseMove(e);
			});
			timeline.canvas.addEventListener("mouseup", function(e) {
				timeline.click(e);
			});
			timeline.canvas.addEventListener("mouseleave", function(e) {
				timeline.mouseLeave(e);
			})
			document.getElementById("magnifyMap").addEventListener("click", function(e) {
				zoomMap(true);
			});
			document.getElementById("minifyMap").addEventListener("click", function(e) {
				zoomMap(false);
			});
			
			document.getElementById("switchRoadmap").addEventListener("click", function(e) {
				if (e.target.classList.contains("active")) {
					return;
				}
				toggleMap();
				e.target.classList.remove("inactive");
				e.target.classList.add("active");
				document.getElementById("switchHybrid").classList.remove("active");
				document.getElementById("switchHybrid").classList.add("inactive");
			});
			
			document.getElementById("switchHybrid").addEventListener("click", function(e) {
				if (e.target.classList.contains("active")) {
					return;
				}
				toggleMap();
				e.target.classList.remove("inactive");
				e.target.classList.add("active");
				document.getElementById("switchRoadmap").classList.remove("active");
				document.getElementById("switchRoadmap").classList.add("inactive");
			});
			
			gMap.addListener("drag", function(e) {
				updateCoordsLabel();
			});
			
			updateCoordsLabel();
		});
	});
})();
