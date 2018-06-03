'use strict';

var express = require('express');
var Evento_Controlador = require("../controladores/evento.controlador");
var api = express.Router();

// Rutas API Evento
api.post("/Evento", Evento_Controlador.altaEvento);
api.post("/NewEvent", Evento_Controlador.nuevoEventoConPlaza);
api.get("/Evento/:id", Evento_Controlador.getEvento);
api.get("/Eventos/:tipo/:pagina", Evento_Controlador.getEventos);
api.get("/EventosC/:tipo", Evento_Controlador.getTotalEventos);
api.get("/Eventos/:tipo", Evento_Controlador.getAllEvents);
api.delete("/Evento/:eventoID", Evento_Controlador.deleteEvent);
api.put("/Evento/:eventoID", Evento_Controlador.updateEvent);
module.exports = api;