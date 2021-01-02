const Ubication = require('../models/Ubication');
async function getUbications(_, res) {
    try {
        const ubication = new Ubication();
        const data = await ubication.getUbications();

        res.status(200).json({ success: true, ubications: data });

    } catch (error) {
        console.log(error);
        res.status(200).json({ success: false });
    }
}


async function createUbication(req, res) {
    try {
        let { ubication } = req.body;


        const newUbication = new Ubication(ubication);
        const response = await newUbication.createUbication(ubication);

        if (response.affectedRows) {
            res.status(200).json({ success: true, message: 'ubication registrado exitosamente!' });

        } else if (response.sqlMessage) {
            throw new Error;
        }


    } catch (error) {
        res.status(200).json({ success: false, message: 'ubication no registrada!' });

    }
}

module.exports = {
    getUbications,
    createUbication
}