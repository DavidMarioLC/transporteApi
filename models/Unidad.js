const db = require('../database/db');

class Unidad {
    constructor(unidad) {
        this.unidad = unidad;
    }

    async getUnidades() {
        try {
            const sql = `SELECT*FROM unidad`;

            const [response] = await db.execute(sql);
            const data = response;
            return data;

        } catch (error) {
            console.log(error);
        }
    }


    async createUnidad() {
        try {
            const sql = "INSERT INTO unidad SET name=?";
            const [responseDB] = await db.execute(sql, [
                this.unidad
            ]);

            const data = responseDB;

            return data;


        } catch (error) {
            return error;
        }
    }
}

module.exports = Unidad;