define([
    'backbone'
], function(B){
    
    var QuejaModel = B.Model.extend({
        idAttribute: "_id",
        defaults: {
            "title" : "mi queja",
            description: String,
            createdAt: Date.now(),
            votes: 1,
            state: 'pendiente',
            owner: user._id ,
            category: 'otros',
            image: '',
            "coords": [ 42.12, 0.221 ]

        }
    });
    
    return QuejaModel;
});