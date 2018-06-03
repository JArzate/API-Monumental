'use strict';

// Se importa el modelo del evento
var Asiento = require('../modelos/asiento');

// Dar alta zonas
function altaAsiento(req, res) {
    var asiento = new Asiento();

    //se recuperan todo el modelo que llega por POST
    //En el body se guardan los parametros que se envian
    var parametros = req.body;
    //console.log(parametros);
    asiento.num_asiento = parametros.num_asiento;
    asiento.ocupado = parametros.ocupado;
    asiento.zona = parametros.zona;

    asiento.save(
        (err, asientoAlmacenado) => {
            if (err) {
                //Hubo error al guardar plaza
                res.status(500).send({ mensaje: "Error al guardar plaza" });
            } else {
                if (!asientoAlmacenado) {
                    res.status(404).send({ mensaje: "No se registro" });
                } else {
                    res.status(200).send(
                        {
                            asiento: asientoAlmacenado
                        }
                    );
                }
            }
        }
    );
}

function getAsientos(req, res) {
    var zonaId = req.params.id;
    //Regresara los eventos listados por fecha 
    if (zonaId) {
        var busqueda = Asiento.find({ zona: zonaId }).sort("num_asiento");
    } else {
        return res.status(500).send({ mensaje: "Error en la peticion" });
    }

    busqueda.populate({ path: 'Zona' })
        .exec(
            (err, asientos) => {
                if (err) {
                    res.status(500).send({ mensaje: "Error en la peticion" })
                } else {
                    if (!asientos) {
                        res.status(404).send({ mensaje: "No hay asientos" });
                    } else {
                        res.status(200).send({ zonas: asientos });
                    }
                }
            }
        );
}

function getAsiento(req, res) {
    //Se obtiene el ID de la plaza
    var asientoId = req.params.id;

    var asiento = Asiento.findById(asientoId)
        .exec(
            (err, asiento) => {
                if (err) {
                    res.status(500).send({ mensaje: "Error en la peticion" });
                } else {
                    if (!asiento) {
                        res.status(404).send({ mensaje: "Asiento no encontrado" });
                    } else {
                        res.status(200).send({ zona: asiento });
                    }
                }
            }
        );
}

function actualizarAsiento(req, res) {
    var asientoId = req.params.id;  
    Asiento.findByIdAndUpdate(asientoId, { ocupado: true },
        (err, asientoActualizado) => {
            if (err) {
                res.status(500).send({ message: "error en la peticion" });
            } else {
                if (!asientoActualizado) {
                    res.status(404).send({ message: "No hay asiento con tal id" });
                } else {
                    return res.status(200).send(
                        {
                            asiento: asientoActualizado
                        }
                    );
                }
            }
        }
    );
}

function getAsientosPorZona(req, res) {
    var zonaId = req.params.zona;
    Asiento.find({ zona: zonaId })
        .sort("num_asiento")
        .populate({ path: 'Zona' })
        .exec(
            (err, asientos) => {
                if (err) {
                    res.status(500).send({ mensaje: "Error en la peticion" });
                } else {
                    if (asientos) {
                        res.status(200).send({ asientos: asientos });
                    } else {
                        res.status(404).send({ mensaje: "Error al obtener asientos" });
                    }
                }
            }
        )
}

function getAsientosDisponiblesPorZona(req, res) {
    var zonaId = req.params.zona;
    Asiento.find({ zona: zonaId, ocupado: false }).count(
        (err, count) => {
            if (err) {
                return res.status(500).send({ mensaje: "Error en la peticion" });
            } else {
                console.log(count);
                if (count >= 0) {
                    return res.status(202).send({ disponibles: count })
                } else {
                    return res.status(404).send({ mensaje: "Error al obtener asientos" });
                }
            }
        }
    );
}

module.exports = {
    altaAsiento,
    getAsiento,
    getAsientos,
    actualizarAsiento,
    getAsientosPorZona,
    getAsientosDisponiblesPorZona
};