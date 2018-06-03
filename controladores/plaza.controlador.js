'use strict';

// Se importa el modelo del evento
var Plaza = require('../modelos/plaza');

// Dar alta eventos
function altaPlaza(req, res) {
    var plaza = new Plaza();

    //se recuperan todo el modelo que llega por POST
    //En el body se guardan los parametros que se envian
    var parametros = req.body;
    //console.log(parametros);
    plaza.num_lugares = parametros.num_lugares;

    //Si nada esta vacio --> Falta que no sea ""
    plaza.save(
        (err, plazaAlmacenada) => {
            if (err) {
                //Hubo error al guardar plaza
                res.status(500).send({ mensaje: "Error al guardar plaza" });
            } else {
                if (!plazaAlmacenada) {
                    res.status(404).send({ mensaje: "No se registro" });
                } else {
                    res.status(200).send(
                        {
                            plaza: plazaAlmacenada
                        }
                    );
                }
            }
        }
    );
}

function getPlazas(req, res) {

    //Regresara los eventos listados por fecha 
    var busqueda = Plaza.find(
        (err, plazas) => {
            if (err) {
                res.status(500).send({ mensaje: "Error en la peticion" })
            } else {
                if (!plazas) {
                    res.status(404).send({ mensaje: "No hay plazas" });
                } else {
                    res.status(200).send({ plazas: plazas });
                }
            }
        }
    );
}

function getPlaza(req, res) {
    //Se obtiene el ID de la plaza
    var plazaID = req.params.id;

    var plaza = Plaza.findById(plazaID)
        .exec(
            (err, plaza) => {
                if (err) {
                    res.status(500).send({ mensaje: "Error en la peticion" });
                } else {
                    if (!plaza) {
                        res.status(404).send({ mensaje: "Evento no encontrado" });
                    } else {
                        res.status(200).send({ plaza: plaza });
                    }
                }
            }
        );
}

module.exports = {
    altaPlaza,
    getPlazas,
    getPlaza
};