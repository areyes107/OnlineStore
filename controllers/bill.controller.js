'use strict'

var Bill = require('../models/bill.model');
var jwt = require('../services/jwt');

function createBill (req, res){
    var params = req.body;
    var bill = new Bill();

    if(params.address && params.name){
        Bill.findOne({$or: [{name: params.name}, {address: params.address}]}, (err, billFind)=>{
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else if(billFind){
                res.send({message: 'Factura ya creada'});
            }else{
                bill.address = params.address; 
                bill.name = params.name;

                bill.save((err, billCreated)=>{
                    if(err){
                        res.status(500).send({message: 'Error en el servidor', err});
                    }else if(billCreated){
                        res.send({bill: billCreated});
                    }else{
                        res.send({message: 'Factura no creada', err})
                    }
                })
            }
        })
    }else{
        res.send({message: 'Debe de ingresar todos los datos de la factura'});
    }
}

module.exports = {
    createBill
}