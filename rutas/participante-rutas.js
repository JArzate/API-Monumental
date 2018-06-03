'use strict';

var express = require('express');
var Participante_Controlador = require("../controladores/participante.controlador");
var api = express.Router();

// Rutas API Evento
api.post("/Participante", Participante_Controlador.altaParticipante);
api.get("/Participante/:id", Participante_Controlador.getParticipante);
api.get("/Participantes/:eventoId", Participante_Controlador.getParticipantes);
api.delete("/Participante/:id", Participante_Controlador.deleteParticipante);
api.put("/Participante/:participanteID", Participante_Controlador.updateParticipante);
module.exports = api;