var express = require('express');
var api = express();
var categoryController = require('../controllers/category.controller');

api.post('/saveCategory', categoryController.saveCategory);
api.get('/listCategories', categoryController.listCategories);
api.put('/updateCategory/:id', categoryController.updateCategorie);
api.delete('/deleteCategory/:id', categoryController.deleteCategory);

module.exports = api;