'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const {Rol} = require ('../enums');

var userSchema = Schema({
    name: String,
    email: String, 
    password: String, 
    username: String,
    role: {type: String, 
        enum: Object.values(Rol), 
        default: Rol.Client},
    cart: {type: Schema.Types.ObjectId, ref: 'cart'}
})

module.exports = mongoose.model('user', userSchema)