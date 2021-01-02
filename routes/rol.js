const { Router } = require('express');
const { getRols } = require('../controllers/rol');

const route = Router()

route.get('/all', getRols);

module.exports = route;
