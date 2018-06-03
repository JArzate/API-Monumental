'use strict';

var express = require('express');
var Zona_Controlador = require("../controladores/zona.controlador");
var api = express.Router();

// Rutas API Evento
api.post("/Zona", Zona_Controlador.altaZona);
api.get("/Zona/:id", Zona_Controlador.getZona);
api.get("/Zonas/:id", Zona_Controlador.getZonas);
api.get("/ZonaD/:plaza_id/:tipo_zona", Zona_Controlador.getZonaEnSecciones);

module.exports = api;