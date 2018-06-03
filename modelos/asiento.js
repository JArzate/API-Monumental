'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Se definen las propiedaddes del modelo
var AsientoSchema = schema({
    num_asiento: Number,
    ocupado: Boolean,
    zona: { type: schema.ObjectId, ref: 'Zona' }
});

module.exports = mongoose.model('Asiento', AsientoSchema);