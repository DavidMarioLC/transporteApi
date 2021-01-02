const { Router } = require('express');
const { getUbications, createUbication } = require('../controllers/ubication');

const route = Router()

route.get('/all', getUbications);
route.post('/add', createUbication);

module.exports = route;
