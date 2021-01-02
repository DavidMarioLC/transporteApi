const { Router } = require('express');
const { getCamionetas, getCamioneta, createCamioneta, getCamionetaUser, getCamionetasReports, createCamionetaReport, updateCamionetaId, deleteCamionetaId } = require('../controllers/camioneta');

const route = Router()

route.get('/all', getCamionetas);
route.get('/reports/all', getCamionetasReports);
route.post('/report/add', createCamionetaReport);
route.post('/add', createCamioneta);
route.get('/:id', getCamioneta);
route.get('/user/:id', getCamionetaUser);
route.put('/update/:id', updateCamionetaId);
route.delete('/:id', deleteCamionetaId)
module.exports = route;
