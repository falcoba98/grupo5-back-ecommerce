const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const cors = require('cors'); // Importar cors

// Servir archivos desde la raíz actual
app.use(express.static(path.join(__dirname)));

// Middleware para servir archivos JSON
app.use(express.json());

// Habilitar CORS para todas las rutas
app.use(cors());

// Servir archivos estáticos
app.use('/data', express.static('data'));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Rutas para los archivos JSON
app.get('/data/cats/cat.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'cats', 'cat.json'));
});

app.get('/data/sell/publish.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'sell', 'publish.json'));
});

app.get('/data/cats_products/:file', (req, res) => {
    const fileName = req.params.file;
    res.sendFile(path.join(__dirname, 'data', 'cats_products', `${fileName}.json`));
});

app.get('/data/products/:file', (req, res) => {
    const fileName = req.params.file;
    res.sendFile(path.join(__dirname, 'data', 'products', `${fileName}.json`));
});

app.get('/data/products_comments/:file', (req, res) => {
    const fileName = req.params.file;
    res.sendFile(path.join(__dirname, 'data', 'products_comments', `${fileName}.json`));
});

app.get('/data/user_cart/:file', (req, res) => {
    const fileName = req.params.file;
    res.sendFile(path.join(__dirname, 'data', 'user_cart', `${fileName}.json`));
});

app.get('/data/cart/buy.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'cart', 'buy.json'));
});

// Ruta raíz para verificar que el servidor funciona
app.get('/', (req, res) => {
    res.send('¡El servidor está funcionando correctamente!');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
