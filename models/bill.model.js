'use strict'

var mongoose = require('mongoose');
var Schemma = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment')

var billSchema = Schemma ({
    billNumber: Number,
    address: String,
    date: Date, 
    name: String,
    total: Number,
    user: [{
        type: Schemma.Types.ObjectId,
        ref: 'user', 
        required: true}],
    products: [{
        product_id: Schemma.Types.ObjectId,
        name: String, 
        quantity: Number,
        subtotal: Number
    }],
    

})

autoIncrement.initialize(mongoose.connection)
Schemma.plugin(autoIncrement.plugin, {model: 'bill', field: 'billNumber', startsAt: 1})

module.exports = mongoose.model('bill', billSchema);