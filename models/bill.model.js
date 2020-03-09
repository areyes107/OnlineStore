'use strict'

const mongoose = require('mongoose');
var Schemma = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment')

var billSchema = Schemma ({

    billNumber: Number,
    address: String,
    date: {type: Date, default: Date.now()}, 
    name: String,
    total: [],
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
billSchema.plugin(autoIncrement.plugin, {model: 'bill', field: 'no_bill', startAt: 1})

module.exports = mongoose.model('bill', billSchema);