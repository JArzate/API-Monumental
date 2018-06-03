'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Se definen las propiedaddes del modelo
var EventoSchema = schema({
    titulo: String,
    fecha: String,
    hora: String,
    imagen: String,
    tipo:Number,
    plaza: { type: schema.ObjectId, ref: 'Plaza' },
});

module.exports = mongoose.model('Evento', EventoSchema);