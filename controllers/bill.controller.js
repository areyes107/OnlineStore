'use strict'

var Bill = require('../models/bill.model');
var User = require('../models/user.model');
const Cart = require('../models/cart.model');
const Product = require ('../models/product.model');

async function createBill (req, res){
    let id = req.params.id;
    let bill = new Bill();

    try {
        let cartFind = await Cart.findOne({user: id});
        if(!cartFind) res.send({message: 'Error al obtener el producto'});
        else if (cartFind.products.length == 0) res.send({message: 'No tiene productos agregados en el carrito'});
        else{
            bill.user = id;
            bill.date = new Date();
            bill.products = cartFind.products;
            bill.total = cartFind.total;

            let billSaved =( await bill.save()).populate('user');
            if(!billSaved) res.send({message: 'No se pudo realizar la compra'});

            else{
                for await(let compra of billSaved.products){

                    for await(let producto of Product.find()){

                        if(compra.product == producto._id){
                            let discount = parseInt(compra.quantity);
                            let stock = parseInt(producto.quantity);
                            let descuento = stock - discount; 
                             
                            await Product.findByIdAndUpdate(producto._id, {$set: {quantity: descuento}, $inc: {sales: descuento}})
                        }
                    }
                }
            }
            let cleanCart = await Cart.findByIdAndUpdate(cartFind._id, {$set: {productos:[], total: 0}});
            if (!cleanCart) res.send({message: 'No se pudo limpiar el carrito'});
            else{
                let detalleFactura = await Bill.findById(billSaved.id).populate('products.product');
                if(!detalleFactura) res.send({billSaved});
                else{
                    res.send({detalleFactura});
                }
            }
        }
    } catch (err) {
        res.status(500).send({message: 'Error en el servidor'});
        console.log(err);
    }
}


async function showBill(req,res){
    let id = req.params.id;
    try{
        let bills = await Bill.find({user:id}).populate('user products.product');
        if(!bills) res.send({message:'No hay ninguna factura agregada'});
        else{
            res.send(bills);
        }
    }catch(err){
        res.status(500).send('Error en el servidor');
        console.log(err);
    }
}




module.exports = {
    createBill,
    showBill
}