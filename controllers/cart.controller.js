'use strict'

const Cart = require('../models/cart.model');
const Product = require('../models/product.model');


async function addToCart (req, res){
    let id = req.params.id;
    let params = req.body;
    let quantity = 1;

    if(params.name && params.quantity){
        try {
            let cartFind = await Cart.findOne({user: id});
            if(!cartFind) res.send({message: 'Error de login'});
            else{
                let productFind = await Product.findOne({name: params.name});
                if(!productFind) res.send({message: 'Producto no existe'});
                else if(productFind.quantity == 0) res.send({message: 'Producto agotado'});
                else{
                    let productAdd = await Cart.findByIdAndUpdate(cartFind._id, {$push: {products: {product:
                            productFind._id,
                            quantity: params.quantity,
                            price: productFind.price,
                        }} });
                        let total = parseInt(cartFind.total) + (parseInt(productFind.price)*parseInt(params.quantity));
                        let totalFinal = await Cart.findByIdAndUpdate(cartFind._id, {$set: {total: totalFinal}});
                        if(!productAdd) res.send({message: 'No se agregó el producto'});
                        else{
                            res.send({message: 'Producto añadido'});
                        }
                }
            }
        } catch (err) {
            res.status(500).send({message: 'Error en el servidor'});
        }
    }else{
        res.send({message: 'Por favor ingrese la cantidad y el nombre del producto'});
    }
}

async function listCart(req, res){
    let cartId = req.params.id;

    try {
        let cartFind = await Cart.findOne({user: cartId});
        if(cartFind) res.status(403).send({message: 'Error de autenticacion'});
        else if(!cartFind) {
            res.send({message: 'No tiene productos agregados al carrito'});
        }
        else{
            res.send({cartFind});
        }
    } catch (err) {
        res.status(500).send({message: 'Error en el servidor'});
    }
}

/*function listCart (req, res){
    var cartId = req.params.id;

    Cart.findOne({cartId}, (err, cartFind)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else if(cartFind){
            res.send({cartFind});
        }else{
            res.send({message: 'No tiene productos agregados al carrito'});
        }
    })
}*/

module.exports = {
    addToCart, 
    listCart
}