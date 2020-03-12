'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = Schema({
    name: String, 
    price: Number,
    quantity: Number,
    category: { type: Schema.Types.ObjectId, ref: 'category'},
     sales: {type: Number, default: 0},
     versionKey:false
})

module.exports = mongoose.model('product', productSchema)