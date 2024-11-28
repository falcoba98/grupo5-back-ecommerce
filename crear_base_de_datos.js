const {db_crear:db} = require('./db');
const fs = require('fs').promises;
const path = require('path');

async function ejecutarSQL() {
    try {
        const sqlFilePath = path.join(__dirname, 'ecommerce.sql');
        const data = await fs.readFile(sqlFilePath, 'utf8');

        const queries = data.split(';').map(query => query.trim()).filter(query => query); // Dividir las sentencias por ';'

        for (const query of queries) {
            if (query.toUpperCase().startsWith('USE')) {
                // Si encontramos 'USE', lo ejecutamos por separado
                await db.query(query);
            } else {
                // Ejecutar otras consultas, como 'CREATE TABLE'
                await db.query(query);
            }
        }

        console.log('Archivo SQL ejecutado correctamente');
        process.exit()
    } catch (err) {
        console.error('Error:', err);
        process.exit()
    }
}

ejecutarSQL();