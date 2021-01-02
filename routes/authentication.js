const { Router } = require('express');
const { authenticateUser, authorizationUser } = require('../controllers/user');

const route = Router()

route.post('/authentication', authenticateUser);
route.get('/authorization', authorizationUser);

module.exports = route;
