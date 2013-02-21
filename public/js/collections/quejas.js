define([
    'backbone',
    'models/queja'
], function(B, QuejaModel){
    
    var QuejasCollection = B.Collection.extend({
        model: QuejaModel,
        url: 'http://isee.tiatere.es:8080/quejas'
    });
    
    return QuejasCollection;
});