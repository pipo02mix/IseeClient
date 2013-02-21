define([
  'underscore',
  'backbone',
  'events',
  'jquery',
  'mapProviderGoogle'
], function(_, Backbone, Event, $, provider) {
    
    var map
    , markers = []
    , currentPosition
    , viewportPosition;

    function initialize() {
        
        getGeolocation();
            
        Event.on("currentPosition-load", function(){
            provider.drawMap(currentPosition);
            viewportPosition = currentPosition;
        });
    }

    function reDraw(){

    }


    function addMarker(marker){
        markers.push(marker);
        provider.addMarker(marker);
    }

    function getCurrentPosition(){
        return currentPosition;
    }
    
    function getViewportPosition(){
        viewportPosition = provider.getViewportCenterPosition();
        return viewportPosition;
    }

    function getGeolocation(){

        if(navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function(position) {
                currentPosition = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                };
                Event.trigger("currentPosition-load");

            }, function() {
                currentPosition = handleNoGeolocation(true);
                Event.trigger("currentPosition-load");
            });

        } else {
        // Browser doesn't support Geolocation
            currentPosition = handleNoGeolocation(false);
            Event.trigger("currentPosition-load");
        }
    }

    function handleNoGeolocation(errorFlag) {

        if (errorFlag) {
            var content = 'Error: The Geolocation service failed.';
        } else {
            var content = 'Error: Your browser doesn\'t support geolocation.';
        }


        var pos = {
            lat: 40.42761,
            lon: -1.195107,
            title: 'No hemos podido localizar tu posicion'
        };

        return pos;
    }

    return {
        init: initialize,
        addMarker: addMarker,
        cp: getCurrentPosition,
        vp: getViewportPosition,
        markers: markers
    };
    
});


