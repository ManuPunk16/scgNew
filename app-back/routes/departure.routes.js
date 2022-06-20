const express = require("express");
const departureController = require('../controllers/departure.controller');

const router = express.Router();

const multiparty = require('connect-multiparty');
const departure_upload = multiparty({ uploadDir: './upload/documents/exit' });

router.get('/salidas-test', departureController.test);
router.post('/guardar_salidas', departureController.saveDeparture);
router.get('/salidas', departureController.getDepartures);
router.get('/salidas/:id', departureController.getDeparture);
router.put('/salidas/:id', departureController.updateDeparture);
router.delete('/salidas/:id', departureController.deleteDeparture);
router.post('/subir-salida/:id', departure_upload, departureController.uploadDeparture);
router.get('/obtener-salida/:exit', departureController.getPdfDeparture);
router.get('/lastdeparture', departureController.getLastModifyDoc);

module.exports = router;
