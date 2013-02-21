var QuejaModel = B.Model.extend({
    idAttribute: "_id",
    urlRoot : '/quejas',
    defaults: {
        "title" : "mi queja",
        "coords": [ 42.12, 0.221 ]

    }
});

var QuejasCollection = B.Collection.extend({
    model: QuejaModel,
    url: 'http://isee.tiatere.es:3000/quejas'
});


var QuejaView = B.View.extend({
    initialize: function (){
        this.render();
    },
    render: function(){
        app.modules.geolocation.addMarker({
            'lat': this.model.get('coords')[0],
            'lon': this.model.get('coords')[1]
        });
    }
});

/*var queja = new QuejaModel({
    "title": "mi primera queja",
    "loc": [41.118778, 1.242837]
});*/

var c_queja = new QuejasCollection();


c_queja.on("sync", function(){
    
    _.each(this.models, function(model){
        app.modules.geolocation.addMarker({
            'lat': model.get('loc')[0],
            'lon': model.get('loc')[1],
            'title': model.get('title')
        });
    });
});

$(document).bind("map-load", function(){
    c_queja.fetch({ data: app.modules.geolocation.currentPosition,
        success: function(quejas) {
          //console.log(quejas);
        }
      });
});

$(document).bind("map-moved", function(){
    
    if (app.modules.geolocation.viewportPosition) {
        c_queja.fetch({ data: app.modules.geolocation.viewportPosition,
            success: function(quejas) {
            console.log("query server");
            }
        });
    }
});

