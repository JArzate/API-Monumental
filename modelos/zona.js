'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Se definen las propiedaddes del modelo
var ZonaSchema = schema({
    sombra: Boolean,
    tipo_zona: Number,
    seccion: Number,
    fila: Number,
    costo:Number,
    plaza: { type: schema.ObjectId, ref: 'Plaza' }
});

module.exports = mongoose.model('Zona', ZonaSchema);