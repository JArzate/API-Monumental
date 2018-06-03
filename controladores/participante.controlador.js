'use strict';

// Se importa el modelo del evento
var Participante = require('../modelos/participante');

// Dar alta eventos
function altaParticipante(req, res) {
    var participante = new Participante();

    //se recuperan todo el modelo que llega por POST
    //En el body se guardan los parametros que se envian
    var parametros = req.body;
    console.log(parametros);
    participante.nombre = parametros.nombre;
    participante.evento = parametros.evento;

    //Si nada esta vacio --> Falta que no sea ""
    participante.save(
        (err, participanteAlmacenado) => {
            if (err) {
                //Hubo error al guardar plaza
                res.status(500).send({ mensaje: "Error al guardar participante" });
            } else {
                if (!participanteAlmacenado) {
                    res.status(404).send({ mensaje: "No se registro" });
                } else {
                    res.status(200).send(
                        {
                            participante: participanteAlmacenado
                        }
                    );
                }
            }
        }
    );
}

function getParticipantes(req, res) {

    var eventoId = req.params.eventoId;
    //Regresara los eventos listados por evento
    if (eventoId) {
        var busqueda = Participante.find({ evento: eventoId }).sort('nombre');
    }else{
        return res.status(500).send({ mensaje: "Error en la peticion" })
    }

    busqueda.populate({ path: 'Evento' })
        .exec(
            (err, participantes) => {
                if (err) {
                    res.status(500).send({ mensaje: "Error en la peticion" })
                } else {
                    if (!participantes) {
                        res.status(404).send({ mensaje: "No hay plazas" });
                    } else {
                        res.status(200).send({ participantes: participantes });
                    }
                }
            }
        );
}

function getParticipante(req, res) {
    //Se obtiene el ID de la plaza
    var participanteID = req.params.id;

    var participante = Participante.findById(participanteID)
        .exec(
            (err, participante) => {
                if (err) {
                    res.status(500).send({ mensaje: "Error en la peticion" });
                } else {
                    if (!participante) {
                        res.status(404).send({ mensaje: "Participante no encontrado" });
                    } else {
                        res.status(200).send({ participante: participante });
                    }
                }
            }
        );
}


function deleteParticipante(req,res){
    var participanteID = req.params.id;
    if (participanteID){
        Participante.findByIdAndRemove(participanteID).exec((err,participante_eliminado)=>{
            if (!err){
                if (participante_eliminado){
                    res.status(200).send({participante:participante_eliminado})
                }else{
                    res.status(404).send({mensaje:"Participante no encontrado"});
                }
            }else{
                res.status(500).send({mensaje:"Erro peticion"});
            }
        });
    }
}

function updateParticipante(req,res){
    var participanteID = req.params.participanteID;
    if (participanteID){
        var nombre = req.body.nombre;
        Participante.findByIdAndUpdate(participanteID,{nombre:nombre}).exec((err,participante_actualizado)=>{
            if (!err){
                if (participante_actualizado){
                    res.status(200).send({participante:participante_actualizado})
                }else{
                    res.status(404).send({mensaje:"Participante no encontrado"});
                }
            }else{
                res.status(500).send({mensaje:"Erro peticion"});
            }
        });
    }

}

module.exports = {
    altaParticipante,
    getParticipantes,
    getParticipante,
    deleteParticipante,
    updateParticipante
};