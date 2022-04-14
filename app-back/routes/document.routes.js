const express = require("express");
const documentController = require('../controllers/document.controller');

const router = express.Router();

const multiparty = require('connect-multiparty');
const entry_upload = multiparty({ uploadDir: './upload/documents/entry' });
const exit_upload = multiparty({ uploadDir: './upload/documents/exit' });

router.get('/test', documentController.test);
router.post('/datos-documentos', documentController.documents);
router.get('/prueba-controlador', documentController.test);
router.post('/save', documentController.save);
router.get('/documents', documentController.getDocuments);
router.get('/documents/:last?', documentController.getDocuments);
router.get('/document/:id', documentController.getDocument);
router.put('/document/:id', documentController.update);
router.delete('/document/:id', documentController.delete);
router.post('/subir-entrada/:id', entry_upload, documentController.uploadEntry);
router.post('/subir-salida/:id', exit_upload, documentController.uploadExit);
router.get('/get-entry/:entry', documentController.getPdfEntry);
router.get('/get-exit/:exit', documentController.getPdfExit);
router.get('/search/:search', documentController.search);

module.exports = router;