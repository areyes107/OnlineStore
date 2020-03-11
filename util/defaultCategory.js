'use strict'

const Category = require('../models/category.model');

async function setCategoryDefault(){
    let defaultCategory = new Category({
        name:"defaultCategory"
    });
    try{
        let exists = await Category.findOne({name:"defaultCategory"});
        if(exists) console.log('Categoria por defecto ya existente');
        else{
            let categorySaved = defaultCategory.save();
            if(!categorySaved) console.log('Categoria por defecto no creada');
            else{
                console.log('Categoria por defecto creada');
            }
        }
    }catch(err){
        console.log(err);
    }
}

async function getDefaultCategory(){
    try{
        let defaultCategory = await Category.findOne({name:"defaultCategory"});
        if(!defaultCategory) console.log('Categoria por defecto no existe');
        else{
            return defaultCategory;
        }
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    setCategoryDefault,
    getDefaultCategory
}