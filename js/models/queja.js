define([
    'backbone'
], function(B){
    
    var QuejaModel = B.Model.extend({
        idAttribute: "_id",
        defaults: {
            "title" : "mi queja",
            "loc": [ 42.12, 0.221 ]

        }
    });
    
    return QuejaModel;
});