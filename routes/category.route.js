'use strict'

var express = require('express');
var api = express();
var categoryController = require('../controllers/category.controller');
var ensureAuth = require('../middlewares/authenticated');

api.post('/saveCategory', ensureAuth.ensureAuthAdmin ,categoryController.saveCategory);
api.put('/updateCategory/:id', ensureAuth.ensureAuthAdmin,categoryController.updateCategorie);
api.delete('/deleteCategory/:id', ensureAuth.ensureAuthAdmin,categoryController.deleteCategory);
api.get('/listCategories', categoryController.listCategories);


module.exports = api;