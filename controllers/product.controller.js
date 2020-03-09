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

module.exports = {
    saveProduct
}