const { Router } = require('express');
const { getAreas, createArea } = require('../controllers/area');

const route = Router()

route.get('/all', getAreas);
route.post('/add', createArea);

module.exports = route;
