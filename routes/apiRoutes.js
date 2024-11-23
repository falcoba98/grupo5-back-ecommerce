const express = require('express');
const router = express.Router();
const path = require('path');

// Ruta para obtener un archivo JSON específico
router.get('/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../data', `${filename}.json`);

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(`Error al cargar el archivo: ${err.message}`);
            res.status(404).json({ error: 'Archivo no encontrado' });
        }
    });
});

module.exports = router;
