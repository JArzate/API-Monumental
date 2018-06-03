'use strict';

var express = require('express');
var SMS_Controlador = require("../controladores/SMS.controlador");
var api = express.Router();

// Rutas API Evento
api.post("/SMS/:to", SMS_Controlador.enviarSMS);


module.exports = api;