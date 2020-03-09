'use strict'

var Product = require ('../models/product.model');

function saveProduct (req, res){
    var params = req.body;
    var product = new Product();

    if(params.name && params.price && params.quantity){
        Product.findOne({name: params.name}, (err, productFind)=>{
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else if(productFind){
                res.send({message: 'Producto ya agregado'});
            }else{
                product.name = params.name;
                product.price = params.price;
                product.quantity = params.quantity;
                product.save ((err, productSaved)=>{
                    if(err){
                        res.status(500).send({message: 'Error en el servidor'});
                    }else if(productSaved){
                        res.send({product: productSaved});
                    }else{
                        res.status(404).send({message: 'No se pudo agregar el producto'});
                    }
                })
            }
        })
    }else{
        res.send({message: 'Ingrese todos los datos del producto'});
    }
}

function listProducts (req, res){
    Product.find({}, (err, productFind)=>{
        if(err){
             res.status(500).send({message: 'Error en el servidor'});
        }else if(productFind){
            res.send({products: productFind});
        }else{
            res.status(404).send({message: 'No se encontró ningún producto'});
        }
    })
}

function stockProducts(req, res){
    const productId = req.params.id;

    Product.findById(productId, (err, stockT)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else if(stockT){
            res.send({product: stockT.name, Available: stockT.quantity});
        }else{
            res.status(404).send({message: 'No se encontró ningun empleado'})
        }
    })  
}

function updateProduct(req, res){
    var productId = req.params.id;
    var update = req.body;

    Product.findOne({name: update.name},  (err, productFind)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else if(productFind){
            res.status(418).send({message: 'El producto ya existe'});

        }else{
            Product.findByIdAndUpdate(productId, update, {new: true}, (err, productUpdated)=>{
                if(err){
                    res.status(500).send({message: 'Error en el servidor'});
                }else if(productUpdated){
                    res.send({product: productUpdated});
                }else{
                    res.status(404).send({message: 'No se pudo actualizar el producto'});
                }
            })
        }
    })
}

function deleteProduct(req, res){
    var productId = req.params.id;

    Product.findByIdAndDelete(productId, (err, productDeleted)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else if(productDeleted){
            res.send({message: 'Producto eliminado correctamente', productDeleted})
        }else{
            res.status(404).send({message: 'No se pudo borrar el producto'});
        }
    })
}

module.exports = {
    saveProduct,
    listProducts,
    stockProducts,
    updateProduct,
    deleteProduct
}