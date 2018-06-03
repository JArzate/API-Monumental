// estnadar JS
'use strict';

// importanto libreria para utilizar la BD en mongo
var mongoose = require('mongoose');
var app = require('./app');

// Puerto pra el API 
//Puede ser cualquiera que no este ocuado
var puerto = process.env.PORT || 4078;

// Conexion a BD Mongo
mongoose.connect('mongodb://localhost:27017/Monumental',
    // funcion callback
    (err, res) => {
        if (err) {
            // se lanza la excepcion
            throw err;
        } else {
            // si se conecto
            console.log("BD Monumental corriendo");

            //Se inicia el servidor y se envia el puerto por el cual estara escuchando
            app.listen(puerto,
                () => {
                    console.log("API Momumental corriendo");
                }
            );
        }
    }
);


