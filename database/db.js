const mysql = require('mysql2');
require('dotenv').config()

class Mysql {
    conexion() {

        // create the pool
        const pool = mysql.createPool({
            host: process.env.PORT_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 100,
            queueLimit: 0
        });

        console.log('base de datos conectada!');
        // now get a Promise wrapped instance of that pool
        return pool.promise();
    }
}

const database = new Mysql()
const db = database.conexion()

module.exports = db;

