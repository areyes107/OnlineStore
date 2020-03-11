'use strict'

const mongoose = require('mongoose');
var Schemma = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment')

var billSchema = Schemma ({

    billNumber: Number,
    date: Date,
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
billSchema.plugin(autoIncrement.plugin, {model: 'bill', field: 'billNumber', startAt: 1})

module.exports = mongoose.model('bill', billSchema);