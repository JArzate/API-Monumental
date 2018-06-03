'use strict';

var express = require('express');
var Plaza_Controlador = require("../controladores/plaza.controlador");
var api = express.Router();

// Rutas API Evento
api.post("/Plaza", Plaza_Controlador.altaPlaza);
api.get("/Plaza/:id", Plaza_Controlador.getPlaza);
api.get("/Plaza", Plaza_Controlador.getPlazas);

module.exports = api;