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
        product: {type: Schema.Types.ObjectId, ref: 'product'},
        price: Number,
        quantity: Number
    }],
    total: {type: Number, default: 0}

})

module.exports = mongoose.model('cart', cartSchema)