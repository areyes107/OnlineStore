'use strict'

var express = require('express');
var api = express();
var productController = require('../controllers/product.controller');

api.post('/saveProduct', productController.saveProduct);
api.get('/listProducts', productController.listProducts);
api.get('/stockProducts/:id', productController.stockProducts);
api.put('/updateProduct/:id', productController.updateProduct);
api.delete('/deleteProduct/:id', productController.deleteProduct);

module.exports = api;