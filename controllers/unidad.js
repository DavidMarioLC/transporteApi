const Unidad = require('../models/Unidad');
async function getUnidades(_, res) {
    try {
        const unidad = new Unidad();
        const data = await unidad.getUnidades();

        res.status(200).json({ success: true, unidades: data });

    } catch (error) {
        console.log(error);
        res.status(200).json({ success: false });
    }
}
async function createUnidad(req, res) {
    try {
        let { unidad } = req.body;


        const newUnidad = new Unidad(unidad);
        const response = await newUnidad.createUnidad();

        if (response.affectedRows) {
            res.status(200).json({ success: true, message: 'Unidad registrado exitosamente!' });

        } else if (response.sqlMessage) {
            throw new Error;
        }


    } catch (error) {
        res.status(200).json({ success: false, message: 'Unidad no registrada!' });

    }

}

module.exports = {
    getUnidades,
    createUnidad
}