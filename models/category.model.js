'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = Schema ({
    name: String,
    products: [{
        name: String, 
        quantity: Number,
        price: Number 
    }]
})

module.exports = mongoose.model('category', categorySchema);