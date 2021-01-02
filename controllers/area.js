const Area = require('../models/Area');
async function getAreas(_, res) {
    try {
        const area = new Area();
        const data = await area.getAreas();

        res.status(200).json({ success: true, areas: data });

    } catch (error) {
        console.log(error);
        res.status(200).json({ success: false });
    }
}

async function createArea(req, res) {
    try {
        let { area } = req.body;


        const newArea = new Area(area);
        const response = await newArea.createArea();

        if (response.affectedRows) {
            res.status(200).json({ success: true, message: 'area registrado exitosamente!' });

        } else if (response.sqlMessage) {
            throw new Error;
        }


    } catch (error) {
        res.status(200).json({ success: false, message: 'area no registrada!' });

    }
}

module.exports = {
    getAreas,
    createArea
}