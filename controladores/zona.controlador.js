'use strict';

// Se importa el modelo del Zona,Asiento
var Zona = require('../modelos/zona');
var Asiento = require('../modelos/asiento');
// Dar alta zonas
function altaZona(req, res) {
    var zona = new Zona();

    //se recuperan todo el modelo que llega por POST
    //En el body se guardan los parametros que se envian
    var parametros = req.body;
    //console.log(parametros);
    zona.sombra = parametros.sol_sombra;
    zona.tipo_zona = parametros.tipo_zona;
    zona.seccion = parametros.seccion;
    zona.fila = parametros.fila;
    zona.costo = parametros.costo;
    zona.plaza = parametros.plaza;

    //Si nada esta vacio --> Falta que no sea ""
    zona.save(
        (err, zonaAlmacenada) => {
            if (err) {
                //Hubo error al guardar plaza
                res.status(500).send({ mensaje: "Error al guardar plaza" });
            } else {
                if (!zonaAlmacenada) {
                    res.status(404).send({ mensaje: "No se registro" });
                } else {
                    res.status(200).send(
                        {
                            zona: zonaAlmacenada
                        }
                    );
                }
            }
        }
    );
}

function getZonas(req, res) {
    var plazaId = req.params.id;
    //Regresara los eventos listados por fecha 
    if (plazaId) {
        var busqueda = Zona.find({ plaza: plazaId }).sort("tipo_zona");
    } else {
        return res.status(500).send({ mensaje: "Error en la peticion" });
    }

    busqueda.populate({ path: 'Plaza' })
        .exec(
            (err, zonas) => {
                if (err) {
                    res.status(500).send({ mensaje: "Error en la peticion" })
                } else {
                    if (!zonas) {
                        res.status(404).send({ mensaje: "No hay zonas" });
                    } else {
                        res.status(200).send({ zonas: zonas });
                    }
                }
            }
        );
}

function getZona(req, res) {
    //Se obtiene el ID de la plaza
    var zonaId = req.params.id;

    var zona = Zona.findById(plazaID)
        .exec(
            (err, zona) => {
                if (err) {
                    res.status(500).send({ mensaje: "Error en la peticion" });
                } else {
                    if (!zona) {
                        res.status(404).send({ mensaje: "Evento no encontrado" });
                    } else {
                        res.status(200).send({ zona: zona });
                    }
                }
            }
        );
}

function getZonaEnSecciones(req, res) {
    var plaza_id = req.params.plaza_id;
    console.log(plaza_id, "Plaza Id");
    var tipo_zona = req.params.tipo_zona;
    console.log(tipo_zona, "Tipo Zona");

    var total_disponibles = 0;
    if (plaza_id && tipo_zona) {
        /* Dada la plaza busca si toda una zona completa (ej. palcos) , aun esta disponible */
        Zona.find(
            {
                plaza: plaza_id,
                tipo_zona: tipo_zona
            }
        )
            .exec(
                (err, zonaEnSecciones) => {
                    if (err) {
                        res.status(500).send({ mensaje: "Error en la peticion" });
                    } else {
                        if (!zonaEnSecciones) {
                            res.status(404).send({ mensaje: "Zona no encontrada" });
                        } else {
                           res.status(200).send({zonaEnSecciones:zonaEnSecciones});
                        }
                    }
                }
            );
    } else {
        res.status(500).send({ mensaje: "Error en la peticion" });
    }

}

module.exports = {
    altaZona,
    getZonas,
    getZona,
    getZonaEnSecciones
};