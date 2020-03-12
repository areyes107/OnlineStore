'use strict'

var User = require('../models/user.model');
var bcrypt = require('bcrypt-nodejs');
var jwt = require ('../services/jwt');
var Cart = require('../models/cart.model');

function saveUser (req, res){
    var params = req.body;
    var user = new User();
    var cart = new Cart();

    if(params.name && 
        params.username &&
        params.password){
            User.findOne({$or: [{username: params.username}, {name: params.name}]}, (err, userFind)=>{
                if(err){
                    res.status(500).send({message: 'Error en el servidor'});

                }else if(userFind){
                    res.send({message: 'usuario o nombre ya usado'});

                }else{
                    user.name = params.name;
                    user.username = params.username;
                    user.password = params.password;
                    user.email = params.email;

                    bcrypt.hash(params.password, null, null, (err, hashPassword)=>{
                        if(err){
                            res.status(500).send({message: 'Error de encriptación'});
                        }else{ 
                            user.password = hashPassword;
                            user.save((err, userSaved)=>{
                                if(err){
                                    res.status(500).send({message: 'Error en el servidor'});
                                }else if(userSaved){
                                    cart.user = userSaved.id;
                                    cart.save((err, cartSaved)=>{
                                        if(err){
                                            res.status(500).send({message: 'Error en el servidor'});
                                        }else if(cartSaved){
                                            res.send({cartSaved, userSaved});
                                        }else{  
                                            res.send({message: 'No se pudo guardar el carrito'});
                                        }   
                                    })
                                }else{
                                    res.status(418).send({message: 'Usuario no guardado'});
        
                                }
                            });  
                        }
                    });
                }});
        }else{
            res.send({message: 'ingrese todos los datos'});
        }
}

function updateRole (req, res){
    var userId = req.params.id;
    var params = req.body;
    User.findByIdAndUpdate(userId, params, {new: true}, (err, userUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else if(userUpdated){
            res.send({user: userUpdated});
        }else{
            res.status(418).send({message: 'Admin no actualizado'});
        }
    })
}

function updateClient (req, res){
    var userId = req.params.id;
    var params = req.body;
        User.findByIdAndUpdate(userId, params, {new: true}, (err, userUpdated)=>{
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else if(userUpdated){
                if(userUpdated.role == 'ADMIN'){
                    res.send({user: userUpdated});
                }else{
                    res.send({message: 'No puede actualizar un usuario ADMIN'});
                }
            }else{
                res.status(418).send({message: 'Admin no actualizado'});
            }
        })
}

function deleteClient (req, res){

    User.findById(userId, (err, userFind)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else if(userFind){
            if(userFind.role == 'CLIENT'){
                User.findByIdAndDelete(userId, (err, userDeleted)=>{
                    if(err){
                        res.status(500).send({message: 'Error en el servidor'});
                    }else{
                        if(userDeleted){
                            res.status(200).send({message: 'Registro Eliminado'});
            
                        }else{
                            res.status(404).send({message: 'Error al encontrar el registro'});
                        }
                    }
                });
            }else{
                res.send({message: 'No puede eliminar un admin'});
            }
        }else{
            res.send({message: 'No se encontró el usuario'});
        }
    })
    
}

function login (req, res){
    var params = req.body;

    if(params.username || params.email){
        if(params.password){
            User.findOne({$or:[{username: params.username},{email: params.email}]} , (err, userFind)=>{
                if(err){
                    res.status(500).send({message: 'Error en el servidor'});

                }else if(userFind){
                    bcrypt.compare(params.password, userFind.password, (err, checkPassword)=>{
                        if(err){
                            res.status(500).send({message: ' error al comparar las contraseñas'});

                        }else if(checkPassword){
                            if(params.gettoken){
                               res.send({token: jwt.createToken(userFind)});
                            }
                            else{
                                res.send({user: userFind});
                            }

                        }else{
                            res.status(401).send({message: 'Contraseña incorrecta'});
                        }
                    })
                }else{
                    res.send({message: 'No se encontró el usuario'})
                }
            })
        }else{
            res.send({message: 'Por favor ingrese la contraseña'})
        }
    }else{
        res.send({message:'Ingrese el nombre de usuario o correo'});  
    }

}

function pruebaMiddleWare(req, res){
    var user = req.user;
    res.send({message: 'Middleware funcionando', req: user})
}

function listUsers (req, res){
    var userId = req.params.id;

    User.find({}, (err, userFind)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else if(userFind){
                res.send({userFind});
        }else{
            res.status(418).send({message: 'Admin no actualizado'});
        }
    })
}

module.exports ={
    saveUser,
    updateRole,
    updateClient,
    deleteClient,
    login,
    pruebaMiddleWare,
    listUsers
}