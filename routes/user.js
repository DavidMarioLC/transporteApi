const { Router } = require('express');
const { getUsers, getUser, createUser, updateUserId, deleteUserId, authorizationUser } = require('../controllers/user');

const route = Router()

route.get('/all', getUsers);
route.post('/add', createUser);
route.get('/:id', getUser);
route.put('/update/:id', updateUserId);
route.delete('/:id', deleteUserId)
module.exports = route;
