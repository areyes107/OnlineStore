'use strict'

var Category = require('../models/category.model');
const Product = require('../models/product.model');
const Util = require('../util/defaultCategory');

function saveCategory (req, res){
    var params = req.body;
    var category = new Category();

    if(params.name){
        Category.findOne({name: params.name}, (err, categoryFind)=>{
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else if(categoryFind){
                res.send({message: 'Categoria ya agregada'});
            }else{
                category.name = params.name;
                category.save ((err, categorySaved)=>{
                    if(err){
                        res.status(500).send({message: 'Error en el servidor'});
                    }else if(categorySaved){
                        res.send({category: categorySaved});
                    }else{
                        res.status(404).send({message: 'No se pudo agregar la categoria'});
                    }
                })
            }
        })
    }else{
        res.send({message: 'Ingrese todos los datos de la categoria'});
    }
}

function listCategories (req, res){
    Category.find({}, (err, categoryFind)=>{
        if(err){
             res.status(500).send({message: 'Error en el servidor'});
        }else if(categoryFind){
            res.send({categories: categoryFind});
        }else{
            res.status(404).send({message: 'No se encontró ninguna categoria'});
        }
    })
}

function updateCategorie(req, res){
    var categoryId = req.params.id;
    var update = req.body;

    Category.findOne({name: update.name},  (err, categoryFind)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else if(categoryFind){
            res.status(418).send({message: 'La cateogoria ya existe'});

        }else{
            Category.findByIdAndUpdate(categoryId, update, {new: true}, (err, categoryUpdated)=>{
                if(err){
                    res.status(500).send({message: 'Error en el servidor'});
                }else if(categoryUpdated){
                    res.send({category: categoryUpdated});
                }else{
                    res.status(404).send({message: 'No se pudo actualizar la categoria'});
                }
            })
        }
    })
}

function deleteCategory(req, res){
    var categoryId = req.params.id;

    Category.findById(categoryId, (err, categoryFind)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else if(categoryFind){
            Product.updateMany({"category._id": categoryId}, {$set: {category: Util.getDefaultCategory()._id}},
                                {new: true}, (err, setDefault)=>{
                                    if(err){
                                        res.status(500).send({message: 'Error en el servidor'});
                                    }else if(setDefault){
                                        Category.findByIdAndDelete(categoryId, (err, categoryDeleted)=>{
                                            if(err){
                                                res.status(500).send({message: 'Error en el servidor'});
                                            }else if(categoryDeleted){
                                                res.send({message: 'Categoria eliminada correctamente', categoryDeleted});
                                            }else{
                                                res.status(404).send({message: 'No se pudo borrar la categoria'});
                                            }
                                        })
                                    }else{
                                        res.status(404).send({message: 'No se pudo pasar a la categoria por defecto'});
                                    }
                                });
        }else{
            res.status(404).send({message: 'No se pudo encontrar la categoria'});
        }
    })
    
}

module.exports = {
    saveCategory,
    listCategories,
    updateCategorie,
    deleteCategory
}