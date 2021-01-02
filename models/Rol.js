const db = require('../database/db');

class Rol {
    constructor(rol) {
        this.rol = rol;
    }

    async getRols() {
        try {
            const sql = `SELECT*FROM rol`;

            const [response] = await db.execute(sql);
            const data = response;
            return data;

        } catch (error) {
            console.log(error);
        }
    }




}


module.exports = Rol;