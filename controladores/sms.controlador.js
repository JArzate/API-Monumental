'use strict';

var esendex = require('esendex')({
    username: 's3350@hotmail.com',
    password: 'monumental.interfaces'
});

function enviarSMS(req, res) {
    var to = req.params.to;
    var mensaje = req.body.mensaje;
    if (to) {
        var messages = {
            accountreference: 'EX0259702',
            message: {
                to: to,
                body: mensaje
            }
        };

        esendex.messages.send(messages, function (err, response) {
            if (err) {
                console.log(response);
                return res.status(500).send({ mensaje: false });
            } else {
                return res.status(200).send({ mensaje: true });
            }
        });
    }
}

module.exports = {
    enviarSMS
};