require.config({
  paths: {
    // Major libraries
    jquery: 'libs/jquery/jquery-min',
    async: 'libs/require/async',
    underscore: 'libs/underscore/underscore-min', // https://github.com/amdjs
    backbone: 'libs/backbone/backbone-min', // https://github.com/amdjs
    sinon: 'libs/sinon/sinon.js',

    // Require.js plugins
    text: 'libs/require/text',
    order: 'libs/require/order'
  }
});

// Let's kick off the application

require([
  'jquery',
  'events',
  'app',
  'backbone',
  'collections/quejas',
  'mapProvider'
], function($, Event, app, B, QuejasCollection, geo){
    
    
    var quejas = new QuejasCollection();


    quejas.on("sync", function(){
        _.each(this.models, function(model){
            geo.addMarker({
                'lat': model.get('coords')[0],
                'lon': model.get('coords')[1],
                'title': model.get('title')
            });
        });
    });

    Event.on("map-load", function(){
        quejas.fetch({ data: geo.cp() , success: function(quejas) {
                quejas.trigger("sync");
        }});
    });

    Event.on("map-moved", function(){
        quejas.fetch({ data: geo.vp() });
    });

    
    
    $(function(){
        //init map system
        geo.init(app.consts.mapProvider);
    });
    
});