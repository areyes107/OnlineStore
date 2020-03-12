'use strict'

var userController = require('../controllers/user.controller');
var cartController = require('../controllers/cart.controller');
var express = require('express');
var api = express();
var middlewareAuth = require('../middlewares/authenticated');

api.post('/saveUser', userController.saveUser);
api.put('/updateRole/:id',  middlewareAuth.ensureAuthAdmin, userController.updateRole);
api.put('/updateClient/:id',  middlewareAuth.ensureAuthClient, userController.updateRole);
api.delete('/deleteClient/:id',  middlewareAuth.ensureAuthClient, userController.updateRole);
api.get('/listUsers', middlewareAuth.ensureAuthClient, userController.listUsers);


api.get ('/login', userController.login);
api.get('/pruebaMiddleware', middlewareAuth.ensureAuthClient, userController.pruebaMiddleWare);

//carrito de compras
api.put('/addToCart/:id', middlewareAuth.ensureAuthClient, cartController.addToCart);
api.get('/listCart/:id', middlewareAuth.ensureAuthClient, cartController.listCart);

module.exports = api;