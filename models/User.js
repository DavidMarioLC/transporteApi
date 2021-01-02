const db = require('../database/db');

class User {

    constructor(username, password, fullname, licence, fk_rol, fk_area) {
        this.username = username;
        this.password = password;
        this.fullname = fullname;
        this.licence = licence;
        this.fk_rol = fk_rol;
        this.fk_area = fk_area;
    }

    async createUser() {
        try {
            const sql = "INSERT INTO users SET username=?, password=?, fullname=?, licence=?, fk_rol=?, fk_area=?";
            const [responseDB] = await db.execute(sql, [
                this.username,
                this.password,
                this.fullname,
                this.licence,
                this.fk_area,
                this.fk_rol,
            ]);

            const data = responseDB;

            return data;


        } catch (error) {
            return error;
        }
    }

    async authenticatedUserName(username) {
        try {
            const [[response]] = await db.execute(`SELECT users.id, users.username,users.password, users.fullname, users.licence, area.name as areaName, rol.name as rolName FROM users
            JOIN rol ON users.fk_rol = rol.id JOIN area ON users.fk_area = area.id WHERE users.username=?`, [username]);
            const data = response;

            return data;

        } catch (error) {
            return error;
        }
    }

    static async getUserIdAuthorization(id) {

        try {
            const sql = `SELECT users.id, username, fullname, licence, area.name as areaName, rol.name as rolName FROM users
             JOIN rol ON users.fk_rol = rol.id JOIN area ON users.fk_area = area.id WHERE users.id=?`;

            const [[response]] = await db.execute(sql, [id]);
            const data = response;
            return data;

        } catch (error) {
            return new error
        }
    }

    async getUsers() {
        try {
            const sql = `SELECT users.id, username, fullname, licence, area.name as nombreArea, rol.name as nombreRol FROM users
             JOIN rol ON users.fk_rol = rol.id JOIN area ON users.fk_area = area.id`;

            const [response] = await db.execute(sql);
            const data = response;
            return data;

        } catch (error) {
            console.log(error);
        }
    }
    async getUserId(id) {
        try {
            const [[response]] = await db.execute('SELECT*FROM users WHERE id=?', [id]);
            const data = response;
            return data;

        } catch (error) {
            return new error
        }
    }

    static async updateUserId(id, user) {

        try {
            const { username, password, fullname, licence, fk_area, fk_rol } = user;

            const sql = `UPDATE users SET
            username=?, 
            password=?,
            fullname=?, 
            licence=?,
            fk_rol=?, 
            fk_area=?
            WHERE id=?`;

            const [responseDB] = await db.execute(sql, [
                username,
                password,
                fullname,
                licence,
                fk_rol,
                fk_area,
                id

            ]);

            const data = responseDB;

            return data;


        } catch (error) {
            return error;
        }
    }

    async deleteUserId(id) {
        try {
            const [[response]] = await db.execute('DELETE FROM users WHERE id=?', [id]);
            const data = response;
            return data;

        } catch (error) {
            console.log(error);
        }
    }
}




module.exports = User;

