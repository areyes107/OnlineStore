'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const {Rol} = require ('../enums');

var userSchema = Schema({
    email: String, 
    password: String, 
    username: String,
    name: String,
    rol: {type: String, 
        enum: Object.values(rol), 
        default: Rol.Client}
})

module.exports = mongoose.model('user', userSchema)