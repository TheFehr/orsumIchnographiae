function initMap() {
    window.map = {
        html: document.querySelector("#map"),
        img: document.querySelector("#map").getElementsByTagName("img")[0],
        zoomedIn: false,

        zoomMapIn: function zoomMapIn(e) {
            console.log("oldHeight: " + map.img.height);
            console.log("oldWidth: " + map.img.width);
            var oldWidth = map.img.width;
            var oldHeight = map.img.height;

            console.log("oldDivHeight: " + map.html.clientHeight);
            console.log("oldDivWidth: " + map.html.clientWidth);
            console.log("newHeight: 2986");
            console.log("newWidth: 5712");
            map.img.width = 5712;
            map.img.height = 2986;
            map.img.style.height = "auto";
            map.html.style.cursor = "zoom-out";
            console.log("MouseY: " + (e.clientY - 50));
            console.log("MouseX: " + e.clientX);

            var prozent = (((map.html.clientWidth - (map.html.width - oldWidth))) / map.img.width) * 100 ;
            var prozentH = ((map.html.clientHeight - (map.html.height - oldHeight)) / map.img.height) * 100;

            map.html.scrollLeft = (e.clientX - 400 ) * prozent;
            map.html.scrollTop = (e.clientY - 100) * prozent;

            console.log("newDivHeight: " + e.target.getBoundingClientRect().height);
            console.log("newDivWidth: " + e.target.getBoundingClientRect().width);

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
