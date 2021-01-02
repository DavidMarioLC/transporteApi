require('dotenv').config()
require('./database/db')
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = process.env.PORT_APP;

app.use(morgan('dev')) //http request 
app.use(cors()) //http permission
app.use(express.json()) //read and send json


const users = require('./routes/user')
app.use('/user', users)

const authentication = require('./routes/authentication')
app.use('/', authentication)


const rol = require('./routes/rol');
app.use('/rol', rol);

const area = require('./routes/area');
app.use('/area', area);

const marca = require('./routes/marca');
app.use('/marca', marca);


const ubication = require('./routes/ubication');
app.use('/ubication', ubication);

const unidad = require('./routes/unidad');
app.use('/unidad', unidad);

const camioneta = require('./routes/camioneta');
app.use('/camioneta', camioneta);

function init() {
    app.listen(port, () => console.log('Servidor Nodejs inicializado.'));
}

init();