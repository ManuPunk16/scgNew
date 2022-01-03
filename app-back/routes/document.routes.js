const express = require("express");
const documentController = require('../controllers/document.controller');

const router = express.Router();

router.post('/datos-documentos', documentController.documents);
router.get('/prueba-controlador', documentController.test);
router.post('/save', documentController.save);

module.exports = router;