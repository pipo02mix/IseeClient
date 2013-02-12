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
                'lat': this.model.get('loc')[0],
                'lon': this.model.get('loc')[1]
            });
        }
    });
    
    return QuejaView;
});