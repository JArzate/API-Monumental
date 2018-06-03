'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Se definen las propiedaddes del modelo
var ParticipanteSchema = schema({
    nombre: String,
    evento: { type: schema.ObjectId, ref: 'Evento' }
});

module.exports = mongoose.model('Participante', ParticipanteSchema);