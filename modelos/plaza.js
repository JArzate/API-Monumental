'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Se definen las propiedaddes del modelo
var PlazaSchema = schema({
    num_lugares: Number    
});

module.exports = mongoose.model('Plaza', PlazaSchema);