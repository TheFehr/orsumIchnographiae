(function() {
    "use strict";

    window.addEventListener("load", function(loadEvent) {

        var map = document.querySelector("#map");
        map.addEventListener("click", function(e) {
            var img = map.getElementsByTagName("img")[0];
            img.width = 5712;
            img.height = 2986;
            img.style.height = "auto";
        });
    });
})();
