'use strict';

// Se importa el modelo del evento
var Promocion = require('../modelos/promocion');

// Dar alta eventos
function altaPromocion(req, res) {
    var promocion = new Promocion();

    //se recuperan todo el modelo que llega por POST
    //En el body se guardan los parametros que se envian
    var parametros = req.body;
    //console.log(parametros);
    promocion.imagen = parametros.imagen;
    promocion.descripcion = parametros.descripcion;

    //Si nada esta vacio --> Falta que no sea ""
    promocion.save(
        (err, promocion_almacenada) => {
            if (err) {
               res.status(500).send({ mensaje: "Error al guardar plaza" });
            } else {
                if (!promocion_almacenada) {
                    res.status(404).send({ mensaje: "No se registro" });
                } else {
                    res.status(200).send(
                        {
                            promocion: promocion_almacenada
                        }
                    );
                }
            }
        }
    );
}

function getPromociones(req, res) {

    //Regresara los eventos listados por fecha 
    Promocion.find(
        (err, promociones) => {
            if (err) {
                res.status(500).send({ mensaje: "Error en la peticion" })
            } else {
                if (!promociones) {
                    res.status(404).send({ mensaje: "No hay promociones" });
                } else {
                    res.status(200).send({ promociones: promociones });
                }
            }
        }
    );
}

function getPromocion(req, res) {
    //Se obtiene el ID de la plaza
    var promocionID = req.params.id;

    Promocion.findById(promocionID)
        .exec(
            (err, promocion) => {
                if (err) {
                    res.status(500).send({ mensaje: "Error en la peticion" });
                } else {
                    if (!promocion) {
                        res.status(404).send({ mensaje: "Promociones no encontrado" });
                    } else {
                        res.status(200).send({ promocion: promocion });
                    }
                }
            }
        );
}

module.exports = {
    altaPromocion,
    getPromociones,
    getPromocion
};