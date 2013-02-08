app.modules.geolocation = (function () {
    var provider
    , map
    , markers = {}
    , currentPosition
    , that = this;
    
    function initialize(p) {
        provider = p;
        
        provider.loadLibrary();
    }
    
    function ready(){
        provider.configure();
        getGeolocation(provider.drawMap);
    }


    function addMarker(marker){
        provider.addMarker(marker);
    }
    
    function getGeolocation(callback){
        
        if(navigator.geolocation) {
            
          navigator.geolocation.getCurrentPosition(function(position) {
            app.modules.geolocation.currentPosition = {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            };
            
            callback(app.modules.geolocation.currentPosition);
            
          }, function() {
              app.modules.geolocation.currentPosition = handleNoGeolocation(true);
          });
          
        } else {
          // Browser doesn't support Geolocation
          app.modules.geolocation.currentPosition = handleNoGeolocation(false);
        }
       
        return app.modules.geolocation.currentPosition;
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
        currentPosition: currentPosition,
        ready: ready
    };

}());


app.modules.geolocation.mapProviderGoogle = function() {
    var that = this
    ,   map
    ,   name = 'google'
    ,   controller;

    function configure(){
        controller = google;
    }

    function loadLibrary(){
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=app.modules.geolocation.ready";

        document.body.appendChild(script);
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
            $(document).trigger("map-load");
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

    return {
        loadLibrary: loadLibrary,
        configure: configure,
        drawMap: drawMap,
        addMarker: addMarker
    };    
};
            