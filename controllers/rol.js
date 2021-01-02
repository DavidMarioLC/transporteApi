const Rol = require('../models/Rol');
async function getRols(_, res) {
    try {
        const rol = new Rol();
        const data = await rol.getRols();

        res.status(200).json({ success: true, rols: data });

    } catch (error) {
        console.log(error);
        res.status(200).json({ success: false });
    }
}

module.exports = {
    getRols
}