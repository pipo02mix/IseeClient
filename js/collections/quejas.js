define([
    'backbone',
    'models/queja'
], function(B, QuejaModel){
    
    var QuejasCollection = B.Collection.extend({
        model: QuejaModel,
        url: 'http://isee.tiatere.es:3000/quejas'
    });
    
    return QuejasCollection;
});