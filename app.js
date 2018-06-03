'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Carga Rutas
var evento_rutas = require('./rutas/evento-rutas');
var plaza_rutas = require('./rutas/plaza-rutas');
var participante_rutas = require('./rutas/participante-rutas');
var zona_rutas = require('./rutas/zona-rutas');
var asiento_rutas = require('./rutas/asiento-rutas');
var promocion_rutas = require('./rutas/promocion-rutas');
var sms_rutas = require('./rutas/sms-rutas');

//Configuracion de body-parser necesario
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//COnfiguracion de cabeceras para la peticion HTTP (get,post,delete,update)
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, OPTIONS, DELETE, POST');
    res.header('Allow','GET, PUT, OPTIONS, DELETE, POST');
    
    next();
});

//Rutas base al API
app.use(evento_rutas);
app.use(plaza_rutas);
app.use(participante_rutas);
app.use(zona_rutas);
app.use(asiento_rutas);
app.use(promocion_rutas);
app.use(sms_rutas);

// Se ecporta para poderlo utilizar en otro archivos, como un import en java aqui es 'require'
module.exports = app;
