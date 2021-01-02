const Camioneta = require('../models/Camioneta');

async function getCamionetas(_, res) {
    try {
        const camioneta = new Camioneta();
        const data = await camioneta.getCamionetas();

        res.status(200).json({ success: true, camionetas: data });

    } catch (error) {
        console.log(error);
        res.status(200).json({ success: false });
    }
}

async function getCamionetasReports(_, res) {
    try {
        const camioneta = new Camioneta();
        const data = await camioneta.getCamionetasReports();

        res.status(200).json({ success: true, camionetasReports: data });

    } catch (error) {
        console.log(error);
        res.status(200).json({ success: false });
    }
}

async function createCamioneta(req, res) {
    try {

        const { placa, modelo, fk_marca, fk_unidad, fk_usuario, kilometraje, startContrato, endContrato, tarifa, fk_ubication } = req.body;
        const camioneta = new Camioneta(placa, modelo, fk_marca, fk_unidad, fk_usuario, kilometraje, startContrato, endContrato, tarifa, fk_ubication);

        const response = await camioneta.createCamioneta();

        if (response.affectedRows) {
            res.status(200).json({ success: true, message: 'camioneta registrado exitosamente!' });

        } else if (response.sqlMessage) {
            throw new Error;
        }


    } catch (error) {
        res.status(200).json({ success: false, message: 'camioneta no registrado!' });

    }
}




async function getCamioneta(req, res) {
    try {
        const { id } = req.params;
        const camioneta = new Camioneta();
        const data = await camioneta.getCamionetaId(id);

        res.status(200).json({ success: true, camioneta: data });

    } catch (error) {
        console.log(error);
        res.status(200).json({ success: false });
    }
}

async function updateCamionetaId(req, res) {
    try {
        const { id } = req.params;
        const camioneta = req.body;

        const response = await Camioneta.updateCamionetaId(id, camioneta);

        if (response.affectedRows) {
            res.status(200).json({ success: true, message: 'Camioneta actualizado' });

        } else {
            throw Error;
        }
    } catch (error) {
        res.status(200).json({ success: false, message: 'Camioneta no actualizado' });
    }
}

async function deleteCamionetaId(req, res) {
    try {
        const { id } = req.params;
        const data = await Camioneta.deleteCamionetaId(id);

        res.status(200).json({ success: true, message: 'camioneta eliminada' });

    } catch (error) {

        res.status(200).json({ success: false, message: 'camioneta no eliminada' });
    }
}

async function getCamionetaUser(req, res) {
    try {
        const { id } = req.params;
        const camioneta = new Camioneta();
        const data = await camioneta.getCamionetaUserId(id);

        res.status(200).json({ success: true, camioneta: data });

    } catch (error) {
        console.log(error);
        res.status(200).json({ success: false });
    }
}

async function createCamionetaReport(req, res) {
    try {
        console.log(req.body);
        const { idCamioneta, kilometrajeActual, observacion, foto } = req.body;
        const response = await Camioneta.createCamionetaReport(idCamioneta, kilometrajeActual, observacion, foto);

        if (response.affectedRows) {
            res.status(200).json({ success: true, message: 'reporte de camioneta registrado exitosamente!' });

        } else if (response.sqlMessage) {
            throw new Error;
        }
    } catch (error) {
        res.status(200).json({ success: false, message: ' reporte de camioneta no registrado!' });

    }
}

module.exports = {
    createCamionetaReport,
    getCamionetas,
    getCamioneta,
    createCamioneta,
    getCamionetaUser,
    getCamionetasReports,
    updateCamionetaId,
    deleteCamionetaId
}