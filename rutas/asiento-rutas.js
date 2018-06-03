'use strict';

var express = require('express');
var Asiento_Controlador = require("../controladores/asiento.controlador");
var api = express.Router();

// Rutas API Evento
api.post("/Asiento", Asiento_Controlador.altaAsiento);
api.get("/Asiento/:id", Asiento_Controlador.getAsiento);;
api.get("/Asientos/:zona", Asiento_Controlador.getAsientosPorZona);
api.get("/AsientosD/:zona", Asiento_Controlador.getAsientosDisponiblesPorZona);
api.put("/Asiento/:id",Asiento_Controlador.actualizarAsiento);
module.exports = api;