const Marca = require('../models/Marca');
async function getMarcas(_, res) {
    try {
        const marca = new Marca();
        const data = await marca.getMarcas();

        res.status(200).json({ success: true, marcas: data });

    } catch (error) {
        console.log(error);
        res.status(200).json({ success: false });
    }
}

async function createMarca(req, res) {
    try {
        let { marca } = req.body;


        const newMarca = new Marca(marca);
        const response = await newMarca.createMarca();

        if (response.affectedRows) {
            res.status(200).json({ success: true, message: 'marca registrado exitosamente!' });

        } else if (response.sqlMessage) {
            throw new Error;
        }


    } catch (error) {
        res.status(200).json({ success: false, message: 'marca no registrada!' });

    }

}

module.exports = {
    getMarcas,
    createMarca
}