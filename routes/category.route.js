'use strict'

var express = require('express');
var api = express();
var categoryController = require('../controllers/category.controller');
var ensureAuth = require('../middlewares/authenticated');

api.post('/saveCategory', ensureAuth.ensureAuthAdmin ,categoryController.saveCategory);
api.get('/listCategories', categoryController.listCategories);
api.put('/updateCategory/:id', ensureAuth.ensureAuthAdmin,categoryController.updateCategorie);
api.delete('/deleteCategory/:id', ensureAuth.ensureAuthAdmin,categoryController.deleteCategory);

module.exports = api;