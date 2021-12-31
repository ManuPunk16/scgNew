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