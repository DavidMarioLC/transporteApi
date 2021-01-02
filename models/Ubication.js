const db = require('../database/db');

class Ubication {
    constructor(ubication) {
        this.ubication = ubication;
    }

    async getUbications() {
        try {
            const sql = `SELECT*FROM ubicacion`;

            const [response] = await db.execute(sql);
            const data = response;
            return data;

        } catch (error) {
            console.log(error);
        }
    }

    async createUbication() {
        try {
            const sql = "INSERT INTO ubicacion SET name=?";
            const [responseDB] = await db.execute(sql, [
                this.ubication
            ]);

            const data = responseDB;

            return data;


        } catch (error) {
            return error;
        }
    }
}

module.exports = Ubication;