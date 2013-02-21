define([
  'jquery',
  'events',
  'async!http://maps.googleapis.com/maps/api/js?sensor=true!callback'
], function($, Event) {
    
    var map
    ,   controller
    ,   muttex = true
    ,   center = {}
    ,   controller = google;

    function initialize(){
        
    }

    function getViewportCenterPosition(){
        return center;
    }

    function drawMap(pos){
        var mapOptions = {
            zoom: 15,
            center: new controller.maps.LatLng(pos.lat, pos.lon),
            disableDefaultUI: true,
            zoomControl: true,
            zoomControlOptions: {
                style: controller.maps.ZoomControlStyle.SMALL
            },
            mapTypeId: controller.maps.MapTypeId.ROADMAP
        };

        map = new controller.maps.Map(document.getElementById('mapa'),
            mapOptions);

        controller.maps.event.addListenerOnce(map, 'idle', function() {
            Event.trigger("map-load");
        });
        controller.maps.event.addListener(map, 'center_changed', function() {

            center ={
                    lat: map.getCenter().lat(),
                    lon: map.getCenter().lng()
                };
            delay("map-moved");
        });
    }

    function addMarker(m){
        var pos = new controller.maps.LatLng(m.lat, m.lon)
        ,   infoWindow = null;

        /* now inside your initialise function */
        infoWindow = new controller.maps.InfoWindow({
            content: m.title
        });

        var marker = new controller.maps.Marker({
            position: pos,
            title: m.title,
            map: map
        });

        controller.maps.event.addListener(marker, 'click', function () {
            // where I have added .html to the marker object.
            infoWindow.open(map, marker);
        });
    }

    function delay(e){

        if (muttex) {
            muttex = false;
            setTimeout(function(){
                Event.trigger(e);
                muttex = true;
            }, 2000);
        }

    }

    return {
        init: initialize,
        drawMap: drawMap,
        getViewportCenterPosition: getViewportCenterPosition,
        addMarker: addMarker
    };    
    
});




