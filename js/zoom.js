function initMap() {
  // var map = new google.maps.Map(document.querySelector('#map'), {
  //         center: {lat: -34.397, lng: 150.644},
  //         scrollwheel: false,
  //         zoom: 8
  //       });

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

            //map.zoomVertical(e, oldWidth);
            //map.zoomHorizontal(e);

            var prozent = ((map.html.clientWidth - 400) / map.img.width) * 100 ;
            var prozentH = ((map.html.clientHeight - 100) / map.img.height) * 100;

            map.html.scrollLeft = (e.clientX - 400 ) * prozent;
            map.html.scrollTop = (e.clientY - 100) * prozent;

            console.log((e.clientX - 200));

            //console.log(( (e.clientY) - map.html.clientHeight/2 -50 ));
            console.log("newDivHeight: " + e.target.getBoundingClientRect().height);
            console.log("newDivWidth: " + e.target.getBoundingClientRect().width);

            map.zoomedIn = true;
        },

        zoomHorizontal: function(e){
          if(e.clientY > 400){
            map.html.scrollTop = map.img.height;
          }
          else if(e.clientY < 80){
            map.html.scrollTop = 0;
          }
          else{
            map.html.scrollTop = map.img.height/2 - (map.html.clientHeight/2) + ( (e.clientY) - map.html.clientHeight/2 )*5;
          }
        },

        zoomVertical: function(e, oldWidth){
          if(e.clientX <= ((map.html.clientWidth - oldWidth)/2)){
            map.html.scrollLeft = 0;
          }
          else if(e.clientX >= (map.html.clientWidth - (( map.html.clientWidth - oldWidth)/2))){
            map.html.scrollLeft = map.img.width;
          }
          else{
            map.html.scrollLeft = map.img.width/2 - (map.html.clientWidth/2) + ( (e.clientX) - map.html.clientWidth/2 )*5;
          }
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
