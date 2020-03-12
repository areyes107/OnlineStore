'use strict'

var express = require('express');
var api = express();
var productController = require('../controllers/product.controller');
var ensureAuth = require('../middlewares/authenticated');

api.post('/saveProduct/:id', ensureAuth.ensureAuthAdmin,productController.saveProduct);
api.put('/updateProduct/:id', ensureAuth.ensureAuthAdmin,productController.updateProduct);
api.delete('/deleteProduct/:id', ensureAuth.ensureAuthAdmin,productController.deleteProduct);
api.get('/listProducts',productController.listProducts);
api.get('/stockProducts/:id', productController.stockProducts);
api.get('/searchProduct', productController.stockProducts);


module.exports = api;