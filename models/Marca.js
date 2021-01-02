const db = require('../database/db');

class Marca {
    constructor(marca) {
        this.marca = marca;
    }

    async getMarcas() {
        try {
            const sql = `SELECT*FROM marca`;

            const [response] = await db.execute(sql);
            const data = response;
            return data;

        } catch (error) {
            console.log(error);
        }
    }

    async createMarca() {
        try {
            const sql = "INSERT INTO marca SET name=?";
            const [responseDB] = await db.execute(sql, [
                this.marca
            ]);

            const data = responseDB;

            return data;


        } catch (error) {
            return error;
        }
    }
}

module.exports = Marca;