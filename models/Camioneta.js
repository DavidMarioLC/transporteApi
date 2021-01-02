const db = require('../database/db');

class Camioneta {

    constructor(placa, modelo, fk_marca, fk_unidad, fk_usuario, kilometraje, startContrato, endContrato, tarifa, fk_ubication) {
        this.placa = placa;
        this.modelo = modelo;
        this.fk_marca = fk_marca;
        this.fk_unidad = fk_unidad;
        this.fk_usuario = fk_usuario;
        this.kilometraje = kilometraje;
        this.startContrato = startContrato;
        this.endContrato = endContrato;
        this.tarifa = tarifa;
        this.fk_ubication = fk_ubication;
    }

    async createCamioneta() {
        try {
            const sql = `INSERT INTO camioneta 
            SET 
             placa=?, 
             modelo=?,
             fk_marca=?, 
             fk_unidad=?,
             fk_usuario =?,
             kilometraje=?,
             startContrato=?,
             endContrato=?,
             tarifa=?,
             fk_ubication=?`;
            const [responseDB] = await db.execute(sql, [
                this.placa,
                this.modelo,
                this.fk_marca,
                this.fk_unidad,
                this.fk_usuario,
                this.kilometraje,
                this.startContrato,
                this.endContrato,
                this.tarifa,
                this.fk_ubication
            ]);

            const data = responseDB;

            return data;


        } catch (error) {
            return error;
        }
    }

    static async createCamionetaReport(idCamioneta, kilometrajeActual, observacion, foto) {

        try {
            const sql = `INSERT INTO reporte_camioneta 
        SET 
         observacion=?,
         foto=?,
         kilometrajeRecorrido=?,
         fk_camioneta=? 
         `;
            const [responseDB] = await db.execute(sql, [
                observacion,
                foto,
                kilometrajeActual,
                idCamioneta
            ]);

            const camionetaSqlUpdate = `UPDATE camioneta SET kilometrajeActual= kilometrajeActual + ?  WHERE id = ? `;
            const [responseDBCamioneta] = await db.execute(camionetaSqlUpdate, [
                kilometrajeActual,
                idCamioneta
            ]);

            const data = responseDBCamioneta;

            return data;


        } catch (error) {
            return error;
        }
    }



    async getCamionetas() {
        try {
            const sql = `SELECT 
            placa,
            camioneta.id as id,
            modelo,
            marca.name as marca,
            unidad.name as unidad,
            users.fullname as usuario,
            kilometraje,
            DATE_FORMAT(startContrato,"%d/%m/%Y")  as startContrato,
            DATE_FORMAT(endContrato,"%d/%m/%Y")  as endContrato,
            tarifa,
            ubicacion.name as ubicacion
            FROM camioneta
             JOIN marca ON camioneta.fk_marca = marca.id
             JOIN unidad ON camioneta.fk_unidad = unidad.id
             JOIN users ON camioneta.fk_usuario = users.id
             JOIN ubicacion ON camioneta.fk_ubication = ubicacion.id
             `;

            const [response] = await db.execute(sql);
            const data = response;
            return data;

        } catch (error) {
            console.log(error);
        }
    }


    async getCamionetasReports() {
        try {
            const sql = `SELECT 
            camioneta.placa,
            unidad.name as unidad,
            DATE_FORMAT(fecha,"%d/%m/%Y")  as fecha,
            reporte_camioneta.observacion,
            reporte_camioneta.foto,
            camioneta.kilometraje as kilometrajeContrato,
            camioneta.kilometrajeActual as kilometrajeActual,
            reporte_camioneta.kilometrajeRecorrido
            FROM reporte_camioneta
             JOIN camioneta ON reporte_camioneta.fk_camioneta = camioneta.id 
             JOIN unidad ON camioneta.fk_unidad = unidad.id
             
             `;

            const [response] = await db.execute(sql);
            const data = response;
            return data;

        } catch (error) {
            console.log(error);
        }
    }

    async getCamionetaId(id) {
        try {
            const [[response]] = await db.execute(`SELECT  
          *,DATE_FORMAT(startContrato,"%d/%m/%Y")  as startContrato,
          DATE_FORMAT(endContrato,"%d/%m/%Y")  as endContrato
             FROM camioneta WHERE id=?`, [id]);
            const data = response;
            return data;

        } catch (error) {

        }
    }
    async getCamionetaUserId(id) {
        try {
            const [[response]] = await db.execute(`SELECT  
          camioneta.id as idCamioneta,
          camioneta.kilometraje,
          camioneta.kilometrajeActual as kilometrajeRecorrido,
          unidad.name as unidad
          FROM camioneta
          JOIN unidad
          ON camioneta.fk_unidad = unidad.id

        WHERE fk_usuario=?`, [id]);
            const data = response;
            return data;

        } catch (error) {

        }
    }

    static async updateCamionetaId(id, camioneta) {

        try {
            const {
                placa,
                modelo,
                fk_marca,
                fk_unidad,
                fk_usuario,
                kilometraje,
                startContrato,
                endContrato,
                tarifa,
                fk_ubication,
            } = camioneta;

            const sql = `UPDATE camioneta SET
            placa=?,
            modelo=?,
            fk_marca=?,
            fk_unidad=?,
            fk_usuario=?,
            kilometraje=?,
            startContrato=?,
            endContrato=?,
            tarifa=?,
            fk_ubication=?
            WHERE id=?`;

            const [responseDB] = await db.execute(sql, [
                placa,
                modelo,
                fk_marca,
                fk_unidad,
                fk_usuario,
                kilometraje,
                startContrato,
                endContrato,
                tarifa,
                fk_ubication,
                id
            ]);

            const data = responseDB;

            return data;


        } catch (error) {
            return error;
        }
    }

    static async deleteCamionetaId(id) {

        try {
            const [[response]] = await db.execute('DELETE FROM camioneta WHERE id=?', [id]);
            const data = response;
            return data;

        } catch (error) {
            console.log(error);
        }
    }
}




module.exports = Camioneta;

