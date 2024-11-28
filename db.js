const mysql = require('mysql2');
const credenciales = {
    host: 'localhost',
    user: 'root', // Cambia a tu usuario
    password: 'root', // Cambia a tu contraseña
    database: 'ecommerce'
}
// Configuración de la conexión
const db = mysql.createPool(credenciales);
const db_crear = mysql.createPool({
    host: credenciales.host,
    user: credenciales.user,
    password: credenciales.password
});


module.exports = {
    db: db.promise(),
    db_crear: db_crear.promise()
}