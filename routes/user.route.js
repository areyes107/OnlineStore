'use strict'

var userController = require('../controllers/user.controller');
var express = require('express');
var api = express();

api.post('/saveUser', userController.saveUser);
api.put('/updateRole/:id', userController.updateRole);
api.put('/updateClient/:id', userController.updateRole);
api.delete('/deleteClient/:id', userController.updateRole);

module.exports = api;