'use strict';

// Se importa el modelo del evento
var Evento = require('../modelos/evento');
var Zona = require('../modelos/zona');
var Asiento = require('../modelos/asiento');
var Plaza = require('../modelos/plaza');
//Paginacion en mongo
var mongoosePagination = require('mongoose-pagination');

// Dar alta eventos
function altaEvento(req, res) {
    var evento = new Evento();

    //se recuperan todo el modelo que llega por POST
    //En el body se guardan los parametros que se envian
    var parametros = req.body;
    console.log(parametros);
    evento.titulo = parametros.titulo;
    evento.fecha = parametros.fecha;
    evento.hora = parametros.hora;
    evento.imagen = parametros.imagen;
    evento.tipo = parametros.tipo;
    evento.plaza = parametros.plaza;

    //Si nada esta vacio --> Falta que no sea ""
    if (parametros.titulo != null
        && parametros.fecha != null
        && parametros.hora != null) {
        evento.save(
            (err, eventoAlmacenado) => {
                if (err) {
                    //Hubo error al guardar evento
                    res.status(500).send({ mensaje: "Error al guardar evento" });
                } else {
                    if (!eventoAlmacenado) {
                        res.status(404).send({ mensaje: "No se registro" });
                    } else {
                        res.status(200).send(
                            {
                                evento: eventoAlmacenado
                            }
                        );
                    }
                }
            }
        );
    } else {
        res.status(200).send({ message: "Introduce todos los campos" });
    }

}

function getEventos(req, res) {
    var tipo = req.params.tipo;

    if (req.params.pagina) {
        var pagina = req.params.pagina;
    } else {
        var pagina = 1;
    }
    //Regresara los eventos listados por fecha 

    var eventosPorPagina = 1;
    if (!tipo) {
        return res.status(500).send({ mensaje: "Error ene la peticion" });
    } else {

        var busqueda = Evento.find({ tipo: tipo })
            .sort('titulo')
            .paginate(pagina, eventosPorPagina);
    }

    busqueda.populate({ path: 'plaza' })
        .exec(
            (err, eventos) => {
                if (err) {
                    res.status(500).send({ mensaje: "Error en la peticion" })
                } else {
                    if (!eventos) {
                        res.status(404).send({ mensaje: "No hay eventos" });
                    } else {
                        res.status(200).send({ eventos: eventos });
                    }
                }
            }
        );
}

function getEvento(req, res) {
    //Se obtiene el ID del evento
    var eventoID = req.params.id;

    var evento = Evento.findById(eventoID)
        .populate({ path: 'plaza' })
        .exec(
            (err, evento) => {
                if (err) {
                    res.status(500).send({ mensaje: "Error en la peticion" });
                } else {
                    if (!evento) {
                        res.status(404).send({ mensaje: "Evento no encontrado" });
                    } else {
                        res.status(200).send({ evento: evento });
                    }
                }
            }
        );
}

function getTotalEventos(req, res) {

    var tipo = req.params.tipo;

    Evento.find({ tipo: tipo }).count({}, function (err, total) {
        if (!err) {
            res.status(200).send({ totalEventos: total })
        } else {
            return res.status(500).send({ mensaje: "Error ene la peticion" });
        }
    });
}

function nuevoEventoConPlaza(req, res) {

    var plaza = new Plaza();
    //Se crea una instancia nueva de una paza
    plaza.save(
        (err, plazaAlmacenada) => {
            if (err) {
                return res.status(500).send({ mensaje: "Error al almacenar plaza" });
            } else {
                if (plazaAlmacenada) {
                    //Si se almaceno correctamente la plaza, se crean las zonas POR SECCION de 1 a 10
                    //desde la zona 1 a 5, 1:Palcos,2:barrera,3:Tendido,4:Platea,5:General
                    for (let seccion = 1; seccion <= 10; seccion++) {
                        for (let numZona = 1; numZona <= 5; numZona++) {
                            // Si es zona 2: barrera, por cada fila se agregan asientos
                            if (numZona == 2) {
                                for (let fila = 1; fila <= 8; fila++) {
                                    var zona = new Zona();
                                    zona.sombra = false;
                                    if (seccion >= 6) {
                                        zona.sombra = true;
                                    }
                                    zona.tipo_zona = numZona;
                                    zona.seccion = seccion;
                                    zona.costo = 0;
                                    zona.plaza = plazaAlmacenada;
                                    zona.fila = fila;
                                    zona.save(
                                        (err, zonaAlmacenada) => {
                                            if (err) {
                                                return res.status(500).send({ mensaje: "Error al almacenar zona" });
                                            } else {
                                                if (zonaAlmacenada) {
                                                    var asientos = setAsientos(numZona, fila);
                                                    //Si se da de alta la zona correctamente, se dan de alta los asientos
                                                    for (let num_asiento = 1; num_asiento <= asientos; num_asiento++) {
                                                        var asiento = new Asiento();
                                                        asiento.ocupado = false;
                                                        asiento.zona = zonaAlmacenada;
                                                        asiento.num_asiento = num_asiento;
                                                        asiento.save(
                                                            (err, asientoALmacenado) => {
                                                                if (err) {
                                                                    return res.status(500).send({ mensaje: "Error al almacenar asiento " + num_asiento });
                                                                } else {
                                                                    if (!asientoALmacenado) {
                                                                        return res.status(404).send({ mensaje: "No se almaceno asiento " + num_asiento + ", zona: + numZona + ", seccion: " + seccion " });
                                                                    } else {
                                                                        if (seccion == 1)
                                                                            console.log("asiento " + num_asiento + "de la fila " + fila + " de la zona " + numZona + "de la seccion " + seccion)
                                                                    }
                                                                }
                                                            }
                                                        );
                                                    }
                                                } else {
                                                    return res.status(404).send({ mensaje: "No se almaceno zona " + numZona + ", en seccion " + seccion + " correctamente" });
                                                }
                                            }
                                        }
                                    );
                                }
                            } else {
                                var zona = new Zona();
                                zona.sombra = false;
                                if (seccion >= 6) {
                                    zona.sombra = true;
                                }
                                zona.tipo_zona = numZona;
                                zona.seccion = seccion;
                                zona.fila = 0;
                                zona.costo = 0;
                                zona.plaza = plazaAlmacenada;
                                zona.save(
                                    (err, zonaAlmacenada) => {
                                        if (err) {
                                            return res.status(500).send({ mensaje: "Error al almacenar zona" });
                                        } else {
                                            if (zonaAlmacenada) {
                                                var asientos = setAsientos(numZona, 0);
                                                //Si se da de alta la zona correctamente, se dan de alta los asientos
                                                for (let num_asiento = 1; num_asiento <= asientos; num_asiento++) {
                                                    var asiento = new Asiento();
                                                    asiento.ocupado = false;
                                                    asiento.zona = zonaAlmacenada;
                                                    asiento.num_asiento = num_asiento;
                                                    asiento.save(
                                                        (err, asientoALmacenado) => {
                                                            if (err) {
                                                                return res.status(500).send({ mensaje: "Error al almacenar asiento " + num_asiento });
                                                            } else {
                                                                if (!asientoALmacenado) {
                                                                    return res.status(404).send({ mensaje: "No se almaceno asiento " + num_asiento + ", zona: + numZona + ", seccion: " + seccion " });
                                                                } else {
                                                                    if (seccion == 1)
                                                                        console.log("asiento " + num_asiento + " de la zona " + numZona + "de la seccion " + seccion)
                                                                }
                                                            }
                                                        }
                                                    );
                                                }

                                            } else {
                                                return res.status(404).send({ mensaje: "No se almaceno zona " + numZona + ", en seccion " + seccion + " correctamente" });
                                            }
                                        }
                                    }
                                );
                            }
                        }
                    }
                    var evento = new Evento();
                    //una vez creada la plaza 
                    var parametros = req.body;
                    console.log(parametros);
                    evento.titulo = parametros.titulo;
                    evento.fecha = parametros.fecha;
                    evento.hora = parametros.hora;
                    evento.imagen = parametros.imagen;
                    evento.tipo = parametros.tipo;
                    evento.plaza = plazaAlmacenada;

                    evento.save(
                        (err, eventoAlmacenado) => {
                            if (err) {
                                return res.status(500).send({ mensaje: "Error en la peticion" });
                            } else {
                                if (eventoAlmacenado) {
                                    return res.status(200).send({ evento: eventoAlmacenado });
                                } else {
                                    return res.status(404).send({ mensaje: "Error al almacenar evento" });
                                }
                            }
                        }
                    );

                } else {
                    return res.status(404).send({ mensaje: "No se almaceno plaza correctamente" });
                }
            }
        }
    );
}

function setAsientos(zona, fila) {
    switch (zona) {
        case 1:
            return 2;
        case 2:
            switch (fila) {
                case 1:
                    return 3;
                case 2:
                    return 4;
                case 3:
                    return 5;
                case 4:
                    return 6;
                case 5:
                    return 7;
                case 6:
                    return 8;
                case 7:
                    return 9;
                case 8:
                    return 10;
            }
            break;
        case 3:
            return 11;
        case 4:
            return 12;
        case 5:
            return 13;
    }
}

function getAllEvents(req, res) {
    var evento_tipo = req.params.tipo;
    Evento.find({tipo:evento_tipo})
        .sort('titulo')
        .populate({ path: 'plaza' })
        .exec((err, eventos) => {
            if (err) {
                res.status(500).send({ mensaje: "Error en la peticion" });
            } else {
                if (eventos) {
                    res.status(200).send({ eventos: eventos });
                } else {
                    res.status(404).send({ mensaje: "Error: no se encontraron eventos" });
                }
            }
        });
}

function deleteEvent(req, res) {
    var eventoID = req.params.eventoID;
    console.log(eventoID, "ID Evento");
    if (eventoID) {
        //Se busca la plaza del evento para borrar sus asientos, luego zonas, luego la plaza y finalmente el evento
        Evento.findById(eventoID).populate({ path: 'Plaza' }).exec((err, evento) => {
            if (!err) {
                if (evento) {
                    var plazaID = evento.plaza;
                    Zona.find({ plaza: plazaID }).exec((err, zonas) => {
                        if (!err) {
                            if (zonas) {
                                let c = 0;
                                zonas.forEach((zona) => {
                                    c++;
                                    console.log(zona._id, "ID Zona")
                                    Asiento.deleteMany({ zona: zona._id }).exec((err, asiento_eliminado) => {
                                        if (!err) {
                                            if (asiento_eliminado) {
                                                console.log('Eliminado as', asiento_eliminado);

                                            } else {
                                                res.status(404).send({ mensaje: "Error: no se encontraron asientos" });
                                            }
                                        } else {
                                            res.status(500).send({ mensaje: "Error en peticion" });
                                        }
                                    });
                                    if (c == zonas.length) {
                                        console.log('Entro en c', c);
                                        Zona.deleteMany({ plaza: plazaID }).exec((err, zonas_eliminada) => {
                                            if (!err) {
                                                if (zonas_eliminada) {
                                                    console.log('Eliminado zon', zonas_eliminada);
                                                    Plaza.findByIdAndRemove(plazaID).exec((err, plaza_eliminada) => {
                                                        if (!err) {
                                                            if (plaza_eliminada) {
                                                                console.log('Eliminado plaza', plaza_eliminada);
                                                                Evento.findByIdAndRemove(eventoID).exec((err, evento_eliminado) => {
                                                                    if (!err) {
                                                                        if (evento_eliminado) {
                                                                            res.status(200).send({ mensaje: "Evento eliminado correctamente" });
                                                                        }
                                                                    }
                                                                });
                                                            } else {
                                                                res.status(404).send({ mensaje: "Error: no se encontraron plaza" });
                                                            }
                                                        } else {
                                                            res.status(500).send({ mensaje: "Error en peticion" });
                                                        }
                                                    });
                                                } else {
                                                    res.status(404).send({ mensaje: "Error: no se encontraron zonas" });
                                                }
                                            } else {
                                                res.status(500).send({ mensaje: "Error en peticion" });
                                            }
                                        });
                                    }
                                });
                            }

                        }
                    });

                } else {
                    res.status(404).send({ mensaje: "Error: no se encontraron evento" });
                }
            } else {
                res.status(500).send({ mensaje: "Error en peticion" });
            }
        });
    }
}

function updateEvent(req, res) {
    var eventoID = req.params.eventoID;
    if (eventoID) {
        var parametros = req.body;
        Evento.findByIdAndUpdate(eventoID,
            {
                titulo : parametros.titulo,
                fecha : parametros.fecha,
                hora : parametros.hora,
                imagen : parametros.imagen,
                tipo : parametros.tipo,
                plaza : parametros.plaza
            }
        ).exec((err,evento_actualizado)=>{
            if (!err){
                if (evento_actualizado){
                    res.status(200).send({evento:evento_actualizado});
                }else{
                    res.status(404).send({mensaje:"Error no evento"});    
                }
            }else{
                res.status(500).send({mensaje:"Erroe en peticion"});
            }
        });
    }
}



module.exports = {
    altaEvento,
    getEvento,
    getEventos,
    getTotalEventos,
    nuevoEventoConPlaza,
    getAllEvents,
    deleteEvent,
    updateEvent
};