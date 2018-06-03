'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Se definen las propiedaddes del modelo
var TicketSchema = schema({
    evento: { type: schema.ObjectId, ref: 'Evento' },
    asiento: { type: schema.ObjectId, ref: 'Asiento' }
});

module.exports = mongoose.model('Ticket', PlazaSchema);