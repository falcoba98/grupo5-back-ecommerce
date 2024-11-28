const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const cors = require('cors'); // Importar cors
const jwt = require('jsonwebtoken');
const secretKey = 'proyecto-backend';
const {db} = require('./db');
// Servir archivos desde la raíz actual
//app.use(express.static(path.join(__dirname)));

// Middleware para servir archivos JSON
app.use(express.json());

// Habilitar CORS para todas las rutas
app.use(cors());

// Servir archivos estáticos
//app.use('/data', express.static('data'));

const authorizationMiddleware = (req,res,next)=>{
    const {authorization} = req.headers
    //verificamos que tenga el token de autorizacion.
    if(!authorization){
        return res.status(401).json({
            error: 'No autorizado.',
            message: 'El usuario no tiene permisos para acceder.'
          });
    }
    //verificamos que el token sea valido.
    jwt.verify(authorization, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                error: 'No autorizado.',
                message: 'Token inválido o expirado.'
              });
        } else {
            //Guardamos el token decodificado en una propiedad usuario.
            req.user = decoded
            //Continuamos a la api solicitada.
            next()
        }
    });
}

app.post('/login', (req,res)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({message:"Email y contraseña son requeridos."})
    }
    const payload = {
        email: req.body.email,
        password: req.body.password
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    res.json({token})
})

// Rutas para los archivos JSON
app.get('/data/cats/cat.json', authorizationMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'cats', 'cat.json'));
});

app.get('/data/sell/publish.json', authorizationMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'sell', 'publish.json'));
});

app.get('/data/cats_products/:file', authorizationMiddleware, (req, res) => {
    const fileName = req.params.file;
    res.sendFile(path.join(__dirname, 'data', 'cats_products', `${fileName}.json`));
});

app.get('/data/products/:file', authorizationMiddleware, (req, res) => {
    const fileName = req.params.file;
    res.sendFile(path.join(__dirname, 'data', 'products', `${fileName}.json`));
});

app.get('/data/products_comments/:file', authorizationMiddleware, (req, res) => {
    const fileName = req.params.file;
    res.sendFile(path.join(__dirname, 'data', 'products_comments', `${fileName}.json`));
});

app.get('/data/user_cart/:file', authorizationMiddleware, (req, res) => {
    const fileName = req.params.file;
    res.sendFile(path.join(__dirname, 'data', 'user_cart', `${fileName}.json`));
});

app.get('/data/cart/buy.json', authorizationMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'cart', 'buy.json'));
});

// Ruta raíz para verificar que el servidor funciona
app.get('/', (req, res) => {
    res.send('¡El servidor está funcionando correctamente!');
});

app.post('/data/cart', authorizationMiddleware, async (req, res) => {
    try {
        const { items } = req.body;
        const { email } = req.user;

        // Validar datos
        if (!email || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Datos inválidos' });
        }

        // Guardar los items en la base de datos
        const queries = items.map(item => {
            const { productId, quantity, price } = item;
            const subtotal = quantity * price;

            return db.query(
                'INSERT INTO cart_items (user_email, product_id, quantity, price, subtotal) VALUES (?, ?, ?, ?, ?)',
                [email, productId, quantity, price, subtotal]
            );
        });

        await Promise.all(queries); // Ejecutar todas las consultas
        res.status(201).json({ message: 'Carrito guardado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al guardar el carrito' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
