'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = Schema({
    name: String, 
    price: Number,
    quantity: Number,
    categories: [{
        name: String}]
})

module.exports = mongoose.model('product', productSchema)