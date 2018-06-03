'use strict';

var express = require('express');
var Promocion_Controlador = require("../controladores/promocion.controlador");
var api = express.Router();

// Rutas API Evento
api.post("/Promocion", Promocion_Controlador.altaPromocion);
api.get("/Promocion/:id", Promocion_Controlador.getPromocion);
api.get("/Promociones", Promocion_Controlador.getPromociones);

module.exports = api;