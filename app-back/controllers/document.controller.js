var validator = require('validator');
var Document = require('../models/document.models');

exports.documents = (req, res) => {
    var doc = req.body.doc;

    return res.status(200).send({
        num_oficio: 'Probando',
        ins_juridico: 'asdasd',
        fecha_recepcion: 'asdasd',
        remitido: 'asdasd',
        origen: 'asdasd',
        direccion: 'asdasd',
        director: 'asdasda',
        asunto: 'asdasda',
        estatus: 'asdasdasd',
        observacion: 'asdasdasd',
        doc
    });
},

exports.test = (req, res) => {
    return res.status(200).send({
        message: 'Soy la accion de test de document' 
    });
}

exports.save = (req, res) => {
    //Recoger parametros por post
    var params = req.body;
    
    //Validar datos
    try {
        var validate_num_oficio = !validator.isEmpty(params.num_oficio);
        var validate_fecha_recepcion = !validator.isEmpty(params.fecha_recepcion);
        var validate_asunto = !validator.isEmpty(params.asunto);
        var validate_estatus = !validator.isEmpty(params.estatus);
    } catch (error) {
        return res.status(200).send({
            status: 'error',
            message: 'Faltan datos por enviar!' 
        });
    }

    if (validate_num_oficio && 
        validate_fecha_recepcion && 
        validate_estatus && 
        validate_asunto) {

        //Crear el objeto a guardar
        const document = new Document();

        //Asignar valores
        document.num_oficio = params.num_oficio;
        document.ins_juridico = params.ins_juridico;
        document.fecha_recepcion = params.fecha_recepcion;
        document.remitido = params.remitido;
        document.origen = params.origen;
        document.direccion = params.direccion;
        document.director = params.director;
        document.asunto = params.asunto;
        document.estatus = params.estatus;
        document.observacion = params.observacion;

        //Guardar el documento
        document.save((err, documentStored) => {
            if (err || !documentStored) {
                return res.status(404).send({
                    status: 'error',
                    message: 'El Documento no se ha guardado!'
                });
            }
            //Devolver respuesta
            return res.status(200).send({
                status: 'Success',
                document: documentStored
            });
        });

        // //Devolver respuesta
        // return res.status(200).send({
        //     status: 'Success',
        //     // Document
        //     document
        // });

    } else {
        return res.status(200).send({
            status: 'error',
            message: 'Los datos no son validos!' 
        });
    }
}