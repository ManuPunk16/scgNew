var validator = require('validator');
var Departure = require('../models/departure.models');

exports.test = (req, res) => {
    return res.status(200).send({
        message: 'Soy la accion de test de salidas!!!'
    });
}

exports.saveDeparture = (req, res) => {
    //Recoger parametros por post
    var params = req.body;
    console.log(params);

    //Validar datos
    try {
        var validate_num_folio = !validator.isInt('$params.num_folio');
        var validate_num_oficio = !validator.isEmpty(params.num_oficio);
    } catch (error) {
        return res.status(200).send({
            status: 'error',
            message: 'Faltan datos por enviar!'
        });
    }

    if (
      validate_num_folio &&
      validate_num_oficio
        ) {

        //Crear el objeto a guardar
        const departure = new Departure();

        //Asignar valores
        departure.num_folio = params.num_folio;
        departure.num_oficio = params.num_oficio;
        departure.ins_juridico = params.ins_juridico;
        departure.fecha_recepcion = params.fecha_recepcion;
        departure.fecha_oficio = params.fecha_oficio;
        departure.fecha_vencimiento = params.fecha_vencimiento;
        departure.dirigido = params.dirigido;
        departure.dependencia = params.dependencia;
        departure.anexo = params.anexo;
        departure.asunto = params.asunto;
        departure.firma_visado = params.firma_visado;
        departure.observacion = params.observacion;
        departure.editCount = params.editCount;
        departure.create_user = params.create_user;

        if(params.pdf_salida){
            departure.pdf_salida = params.pdf_salida;
        }else{
            departure.pdf_salida = null;
        }

        //Guardar el documento
        departure.save((err, departureStored) => {
            if (err || !departureStored) {
                console.log("Problema 404: ",err);
                return res.status(404).send({
                    status: 'error',
                    message: 'El Documento de salida no se ha guardado!'
                });
            }
            console.log("Nuevo registro de salida: ", departureStored._id);
            //Devolver respuesta
            return res.status(200).send({
                status: 'Success',
                departure: departureStored
            });
        });

    } else {
        return res.status(424).send({
            status: 'error',
            message: 'Los datos no son validos!!!'
        });
    }
},

exports.getDepartures = (req, res) => {
    var query = Departure.find({});
    var last = req.params.last;
    if (last || last != undefined) {
        query.limit(2);
    }

    //Find
    query.sort('num_folio').exec((err, departure) => {

        if (err) {
            return res.status(500).send({
                status: 'error',
                message: 'Error al devolver los documentos de salida!'
            });
        }

        if (!departure) {
            return res.status(404).send({
                status: 'error',
                message: 'No hay documentos de salida para mostrar!'
            });
        }

        return res.status(200).send({
            status: 'success',
            departure
        });
    });
},

exports.getLastModifyDoc = (req, res) => {
  var query = Departure.find({}).sort({updatedAt: -1});

  query.limit(1).exec((err, departure) => {
    if (err) {
      return res.status(500).send({
          status: 'error',
          message: 'Error al devolver los documentos!'
      });
    }

    if (!departure) {
        return res.status(404).send({
            status: 'error',
            message: 'No hay documentos para mostrar!'
        });
    }

    return res.status(200).send({
        status: 'success',
        departure
    });
  });
},

exports.getDeparture = (req, res) => {
    //Recoger id de url
    var departureId = req.params.id;

    //Comprobar si existe
    if (!departureId || departureId == null) {
        return res.status(404).send({
            status: 'error',
            message: 'No existe el documento!'
        });
    }

    //Buscar el documento
    Departure.findById(departureId, (err, departure) => {
        if (err || !departure) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el documento!'
            });
        }

        //Devolverlo en json
        return res.status(200).send({
            status: 'success',
            departure
        });
    });
},

exports.updateDeparture = (req, res) => {
    //Recoger id del documento por url
    var departureId = req.params.id;

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
        var validate_fecha_oficio = !validator.isEmpty(params.fecha_oficio);
        var validate_ins_juridico = !validator.isEmpty(params.ins_juridico);
        var validate_dirigido = !validator.isEmpty(params.dirigido);
        var validate_dependencia = !validator.isEmpty(params.dependencia);
        var validate_asunto = !validator.isEmpty(params.asunto);
    } catch (err) {
        // console.log(err);
        //TypeError: Expected a string but received a number
        return res.status(404).send({
            status: 'error',
            message: 'Faltan datos por enviar!'
        });
    }

    if (
      validate_num_oficio &&
      validate_fecha_oficio &&
      validate_ins_juridico &&
      validate_dirigido &&
      validate_dependencia &&
      validate_asunto
    ) {
        //Find and update
        Departure.findOneAndUpdate({_id: departureId}, params, {new:true}, (err, departureUpdated) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al actualizar!'
                });
            }

            if (!departureUpdated) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo!'
                });
            }

            console.log("Documento de Salida Editado: ", departureUpdated._id);

            return res.status(200).send({
                status: 'success',
                departure: departureUpdated
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

exports.deleteDeparture = (req, res) => {
    //Recoger el id de la url
    var departureId = req.params.id;

    //Find and delete
    Departure.findByIdAndDelete({_id: departureId}, (err, departureRemoved) => {
        if(err){
            return res.status(500).send({
                status: 'error',
                message: 'Error al borrar!'
            });
        }
        if(!departureRemoved){
            return res.status(404).send({
                status: 'error',
                message: 'No se ha guardado el articulo, no existe!'
            });
        }

        console.log("Documento de Salida Eliminado: ", departureRemoved);

        return res.status(200).send({
            status: 'success',
            departure: departureRemoved
        });
    });
},

exports.uploadDeparture = (req, res) => {
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

exports.getPdfDeparture = (req, res) => {
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
}
// ,

// exports.search = (req, res) => {
//     //sacar el string a buscar
//     var searchString = req.params.search;
//     // var searchInt = (isNaN(searchString)) ? -1 : parseInt(searchString);
//     console.log(searchString);
//     //find or
//     Document.find({ "$or": [
//         // { "num_folio": { "$regex": searchInt, "$options": "i"}},
//         { "num_oficio": { "$regex": searchString, "$options": "i"}},
//         { "ins_juridico": { "$regex": searchString, "$options": "i"}},
//         { "fecha_recepcion": { "$regex": searchString, "$options": "i"}},
//         { "fecha_oficio": { "$regex": searchString, "$options": "i"}},
//         { "remitido": { "$regex": searchString, "$options": "i"}},
//         { "origen": { "$regex": searchString, "$options": "i"}},
//         { "asignado": { "$regex": searchString, "$options": "i"}},
//         { "asunto": { "$regex": searchString, "$options": "i"}},
//         { "estatus": { "$regex": searchString, "$options": "i"}},
//         { "observacion": { "$regex": searchString, "$options": "i"}}
//     ]})
//     .sort([['num_folio', 'ascending']])
//     .exec((err, documents) => {
//         // console.log(err);
//         // console.log(documents);
//         if (err) {
//             return res.status(500).send({
//                 status: 'error',
//                 message: 'Error en la peticion'
//             });
//         }
//         if (!documents || documents.length <= 0) {
//             return res.status(404).send({
//                 status: 'error',
//                 message: 'No hay documentos relacionados con tu busqueda!'
//             });
//         }
//         return res.status(200).send({
//             status: 'succes',
//             documents
//         });
//     });
// }
