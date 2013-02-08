/*B.sync = function(method, model, options) {

    if (method === "create") {
        $.ajax({
            url: "http://isee.tiatere.es:3000/quejas",
            type: "POST",
            dataType: "json",
            crossDomain: true,
            data: model.attributes,
            success: function(res){
                console.log(res);
            }
        });
    }
    if (method === "read") {
        $.ajax({
            url: "http://isee.tiatere.es:3000/quejas",
            type: "GET",
            dataType: "json",
            crossDomain: true,
            data: ''
        }).done(function(data){
            console.log("quejas leidas");
            return data;
        });
    }

};*/

var QuejaModel = B.Model.extend({
    idAttribute: "_id",
    urlRoot : '/quejas',
    defaults: {
        "title" : "mi queja",
        "loc": [ 42.12, 0.221 ]

    }
});

var QuejasCollection = B.Collection.extend({
    model: QuejaModel,
    url: 'http://isee.tiatere.es:3000/quejas'
});


var QuejaView = B.View.extend({
    initialize: function (){
        console.log("viste de la queja incializada");
        this.render();
    },
    render: function(){
        console.log(this.model.get('loc'));
        app.modules.geolocation.addMarker({
            'lat': this.model.get('loc')[0],
            'lon': this.model.get('loc')[1]
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
        console.log("modelo mapa:", model);
        app.modules.geolocation.addMarker({
            'lat': model.get('loc')[0],
            'lon': model.get('loc')[1],
            'title': model.get('title')
        });
    });
    /*for (var i = 0, l = nquejas.length; i < length; i++) {
        app.modules.geolocation.addMarker({
            'lat': this.model.get('loc')[0],
            'lon': this.model.get('loc')[1]
        });
    }*/
});

//queja.save();




$(document).bind("map-load", function(){
    c_queja.fetch({ data: app.modules.geolocation.currentPosition,
        success: function(quejas) {
          console.log(quejas);
        }
      });
    /*var v_queja = new QuejaView({
        model: queja
    });*/
});

