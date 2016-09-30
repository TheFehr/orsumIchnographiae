(function() {
    "use strict";

    var map;

    function initMap() {
        map = {
            html: document.querySelector("#map"),
            img: document.querySelector("#map").getElementsByTagName("img")[0],
            zoomedIn: false,

            zoomMapIn: function zoomMapIn() {
                map.img.width = 5712;
                map.img.height = 2986;
                map.img.style.height = "auto";
                map.html.style.cursor = "zoom-out";
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

    window.addEventListener("load", function(loadEvent) {
        initMap();

        map.html.addEventListener("click", function(e) {
            if (!map.zoomedIn)
                map.zoomMapIn();
            else
                map.zoomMapOut();
        });
    });
})();
