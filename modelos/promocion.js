'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Se definen las propiedaddes del modelo
var PromocionSchema = schema({
    imagen: String,
    descripcion:String
});

module.exports = mongoose.model('Promocion', PromocionSchema);