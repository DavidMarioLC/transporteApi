const { Router } = require('express');
const { getUnidades, createUnidad } = require('../controllers/unidad');

const route = Router()

route.get('/all', getUnidades);
route.post('/add', createUnidad);

module.exports = route;
