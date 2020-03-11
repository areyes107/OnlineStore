'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = Schema({
    name: String, 
    price: Number,
    quantity: Number,
    sales: {type: Number, default: 0},
    category: {
        type: Schema.Types.ObjectId, ref: 'category'}
})

module.exports = mongoose.model('product', productSchema)