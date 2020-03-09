'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    products: [{
        proct_id: Schema.Types.ObjectId,
        name: String,
        price: Number,
        quantity: Number
    }]
})

module.exports = mongoose.model('cart', cartSchema)