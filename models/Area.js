const db = require('../database/db');

class Area {
    constructor(area) {
        this.area = area;
    }

    async getAreas() {
        try {
            const sql = `SELECT*FROM area`;

            const [response] = await db.execute(sql);
            const data = response;
            return data;

        } catch (error) {
            console.log(error);
        }
    }

    async createArea() {
        try {
            const sql = "INSERT INTO area SET name=?";
            const [responseDB] = await db.execute(sql, [
                this.area
            ]);

            const data = responseDB;

            return data;


        } catch (error) {
            return error;
        }
    }
}

module.exports = Area;