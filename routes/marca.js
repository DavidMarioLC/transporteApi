const { Router } = require('express');
const { getMarcas, createMarca } = require('../controllers/marca');

const route = Router()

route.get('/all', getMarcas);
route.post('/add', createMarca);
module.exports = route;
