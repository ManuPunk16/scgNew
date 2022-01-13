var validator = require('validator');
var Document = require('../models/document.models');
var fs = require('fs');
var path = require('path');

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
        var validate_num_folio = !validator.isInt('$params.num_folio');
        var validate_num_oficio = !validator.isEmpty(params.num_oficio);
        var validate_asunto = !validator.isEmpty(params.asunto);
        var validate_estatus = !validator.isEmpty(params.estatus);
    } catch (error) {
        return res.status(200).send({
            status: 'error',
            message: 'Faltan datos por enviar!' 
        });
    }

    if (validate_num_folio &&
        validate_num_oficio &&
        validate_estatus && 
        validate_asunto) {

        //Crear el objeto a guardar
        const document = new Document();

        //Asignar valores
        document.num_folio = params.num_folio;
        document.num_oficio = params.num_oficio;
        document.ins_juridico = params.ins_juridico;
        document.fecha_recepcion = params.fecha_recepcion;
        document.remitido = params.remitido;
        document.origen = params.origen;
        document.asignado = params.asignado;
        document.asunto = params.asunto;
        document.estatus = params.estatus;
        document.observacion = params.observacion;

        if(params.pdf_entrada){
            document.pdf_entrada = params.pdf_entrada;
        }else{
            document.pdf_entrada = null;
        }

        if(params.pdf_salida){
            document.pdf_salida = params.pdf_salida;
        }else{
            document.pdf_salida = null;
        }

        //Guardar el documento
        document.save((err, documentStored) => {
            if (err || !documentStored) {
                console.log(err);
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

    } else {
        return res.status(200).send({
            status: 'error',
            message: 'Los datos no son validos!' 
        });
    }
},

exports.getDocuments = (req, res) => {
    var query = Document.find({});
    var last = req.params.last;
    if (last || last != undefined) {
        query.limit(2);
    }

    //Find
    query.sort('num_folio').exec((err, document) => {

        if (err) {
            return res.status(500).send({
                status: 'error',
                message: 'Error al devolver los documentos!' 
            });
        }
    
        if (!document) {
            return res.status(404).send({
                status: 'error',
                message: 'No hay documentos para mostrar!' 
            });
        }

        return res.status(200).send({
            status: 'success',
            document
        });
    });
},

exports.getDocument = (req, res) => {
    //Recoger id de url
    var documentId = req.params.id;

    //Comprobar si existe
    if (!documentId || documentId == null) {
        return res.status(404).send({
            status: 'error',
            message: 'No existe el documento!' 
        });
    }

    //Buscar el documento
    Document.findById(documentId, (err, document) => {
        if (err || !document) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el documento!' 
            });
        }

        //Devolverlo en json
        return res.status(200).send({
            status: 'success',
            document
        });
    });
},

exports.update = (req, res) => {
    //Recoger id del documento por url
    var documentId = req.params.id;

    //Recoger datos que llegan por put
    var params = req.body;

    //Validar datos
    try {
        //https://www.npmjs.com/package/validator < libreria
        //validator.isEmpty solo admite strings como parámetros
        //const validate_num_folio = !validator.isInt(`${params.num_folio}`);
        //convertir a string esta variable en esa misma línea vvvvvvvvv
        const validate_num_folio = !validator.isEmpty('$params.num_folio');
        var validate_num_oficio = !validator.isEmpty(params.num_oficio);
        var validate_ins_juridico = !validator.isEmpty(params.ins_juridico);
        var validate_fecha_recepcion = !validator.isEmpty(params.fecha_recepcion);
        var validate_remitido = !validator.isEmpty(params.remitido);
        var validate_origen = !validator.isEmpty(params.origen);
        var validate_asignado = !validator.isEmpty(params.asignado);
        var validate_asunto = !validator.isEmpty(params.asunto);
        var validate_estatus = !validator.isEmpty(params.estatus);
        var validate_observacion = !validator.isEmpty(params.observacion);
    } catch (err) {
        // console.log(err);
        //TypeError: Expected a string but received a number
        return res.status(404).send({
            status: 'error',
            message: 'Faltan datos por enviar!' 
        });
    }

    if (validate_num_oficio) {
        //Find and update
        Document.findOneAndUpdate({_id: documentId}, params, {new:true}, (err, documentUpdated) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al actualizar!' 
                });
            }

            if (!documentUpdated) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo!' 
                });
            }

            return res.status(200).send({
                status: 'success',
                document: documentUpdated 
            });
        });
    } else {
        //Devolver respuesta
        return res.status(500).send({
            status: 'error',
            message: 'La validacion no es correcta!' 
        });
    }
},

exports.delete = (req, res) => {
    //Recoger el id de la url
    var documentId = req.params.id;

    //Find and delete  
    Document.findByIdAndDelete({_id: documentId}, (err, documentRemoved) => {
        if(err){
            return res.status(500).send({
                status: 'error',
                message: 'Error al borrar!' 
            });
        }
        if(!documentRemoved){
            return res.status(404).send({
                status: 'error',
                message: 'No se ha guardado el articulo, no existe!' 
            });
        }

        return res.status(200).send({
            status: 'success',
            document: documentRemoved 
        });
    });
},

exports.uploadEntry = (req, res) => {
    // --- MEJORAR CODIGO ---
    // Configurar el modulo connect multiparty router/article.js (hecho)
    // Recoger el fichero de la petición
    var file_name = 'Imagen no subida...';

    if(!req.files){
        return res.status(404).send({
            status: 'error',
            message: file_name
        });
    }

    // Conseguir nombre y la extensión del archivo
    var file_path = req.files.file0.path;
    var file_split = file_path.split('\\');

    // * ADVERTENCIA * EN LINUX O MAC
    // var file_split = file_path.split('/');

    // Nombre del archivo
    var file_name = file_split[3];

    // Extensión del fichero
    var extension_split = file_name.split('\.');
    var file_ext = extension_split[1];

    // console.log(file_ext);
    // console.log(file_name);
    // console.log(req.files);

    //Comprobar la existencia, solo pdfs, si es valido borrar el fichero
    if(file_ext != 'pdf' && file_ext != 'PDF'){
        //borrar el archivo subido
        fs.unlink(file_path, (err) => {
            return res.status(500).send({
                status: 'error',
                message: 'La extension del archivo no es valido'
            });
        });
    }else{
        //si todo es valido
        var documentId = req.params.id;
        //Buscar el articulo, asignarle el nombre de la imagen y actualizarlo
        Document.findByIdAndUpdate({_id: documentId}, {pdf_entrada: file_name}, {new:true}, (err, documentUpdated) => {
            if (err || !documentUpdated) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al guardar el documento!'
                });
            }
            return res.status(200).send({
                status: 'success',
                document: documentUpdated
            });
        });
    }

    //si todo es valido
    //Buscar el documento y asignarle nombre del pdf y actualizar
    // return res.status(404).send({
    //     fichero: req.files,
    //     split: file_split,
    //     file_ext
    // });
},

exports.uploadExit = (req, res) => {
    // --- MEJORAR CODIGO ---
    var file_name = 'PDF salida no subido...';

    if(!req.files){
        return res.status(404).send({
            status: 'error',
            message: file_name
        });
    }

    var file_path = req.files.file0.path;
    var file_split = file_path.split('\\');
    var file_name = file_split[3];
    var extension_split = file_name.split('\.');
    var file_ext = extension_split[1];

    if(file_ext != 'pdf' && file_ext != 'PDF'){
        fs.unlink(file_path, (err) => {
            return res.status(500).send({
                status: 'error',
                message: 'La extension del archivo no es valido'
            });
        });
    }else{
        var documentId = req.params.id;
        Document.findByIdAndUpdate({_id: documentId}, {pdf_salida: file_name}, {new:true}, (err, documentUpdated) => {
            if (err || !documentUpdated) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al guardar el documento!'
                });
            }
            return res.status(200).send({
                status: 'success',
                document: documentUpdated
            });
        });
    }
},

exports.getPdfEntry = (req, res) => {
    var file = req.params.entry;
    var path_file = './upload/documents/entry/'+file;

    fs.exists(path_file, (exists) => {
        if (exists) {
            return res.sendFile(path.resolve(path_file));
        } else {
            return res.status(404).send({
                status: 'error',
                message: 'El archivo no existe'
            });
        }
    });
},

exports.getPdfExit = (req, res) => {
    var file = req.params.exit;
    var path_file = './upload/documents/exit/'+file;

    fs.exists(path_file, (exists) => {
        if (exists) {
            return res.sendFile(path.resolve(path_file));
        } else {
            return res.status(404).send({
                status: 'error',
                message: 'El archivo no existe'
            });
        }
    });
},

exports.search = (req, res) => {
    //sacar el string a buscar
    var searchString = req.params.search;
    // var searchInt = (isNaN(searchString)) ? -1 : parseInt(searchString);
    console.log(searchString);
    //find or
    Document.find({ "$or": [
        // { "num_folio": { "$regex": searchInt, "$options": "i"}},
        { "num_oficio": { "$regex": searchString, "$options": "i"}},
        { "ins_juridico": { "$regex": searchString, "$options": "i"}},
        { "fecha_recepcion": { "$regex": searchString, "$options": "i"}},
        { "remitido": { "$regex": searchString, "$options": "i"}},
        { "origen": { "$regex": searchString, "$options": "i"}},
        { "asignado": { "$regex": searchString, "$options": "i"}},
        { "asunto": { "$regex": searchString, "$options": "i"}},
        { "estatus": { "$regex": searchString, "$options": "i"}},
        { "observacion": { "$regex": searchString, "$options": "i"}}
    ]})
    .sort([['num_folio', 'ascending']])
    .exec((err, documents) => {
        // console.log(err);
        // console.log(documents);
        if (err) {
            return res.status(500).send({
                status: 'error',
                message: 'Error en la peticion'
            });
        }
        if (!documents || documents.length <= 0) {
            return res.status(404).send({
                status: 'error',
                message: 'No hay documentos relacionados con tu busqueda!'
            });
        }
        return res.status(200).send({
            status: 'succes',
            documents
        });
    });
}