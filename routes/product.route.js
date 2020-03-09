'use strict'

var express = require('express');
var api = express();
var productController = require('../controllers/product.controller');

api.post('/saveProduct', productController.saveProduct);

module.exports = api;