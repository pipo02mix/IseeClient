define([
    'backbone',
    'models/queja'
], function(B, QuejaModel){
    
    var QuejaView = B.View.extend({
        initialize: function (){
            this.render();
        },
        render: function(){
            geo.addMarker({
                'lat': this.model.get('coords')[0],
                'lon': this.model.get('coords')[1]
            });
        }
    });
    
    return QuejaView;
});