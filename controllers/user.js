const User = require('../models/User');
const jwt = require('jsonwebtoken');

const { encryptingPassword } = require('../utils/encryptingPassword');
const { checkingPassword } = require('../utils/checkingPassword');

async function getUsers(_, res) {
    try {
        const user = new User();
        const data = await user.getUsers();

        res.status(200).json({ success: true, users: data });

    } catch (error) {
        console.log(error);
        res.status(200).json({ success: false });
    }
}
async function createUser(req, res) {
    try {
        let { username, password, fullname, licence, fk_area, fk_rol } = req.body;
        password = await encryptingPassword(password);

        const user = new User(username, password, fullname, licence, fk_area, fk_rol);
        const response = await user.createUser();

        if (response.affectedRows) {
            res.status(200).json({ success: true, message: 'usuario registrado exitosamente!' });

        } else if (response.sqlMessage) {
            throw new Error;
        }


    } catch (error) {
        res.status(200).json({ success: false, message: 'usuario no registrado!' });

    }
}

async function authenticateUser(req, res) {
    try {
        let { username, password } = req.body;

        const user = new User();

        const usernameExits = await user.authenticatedUserName(username);


        if (usernameExits) {
            const currentPasswordDB = usernameExits.password;
            const validatePassword = await checkingPassword(currentPasswordDB, password);

            if (validatePassword) {
                const token = await jwt.sign({ userId: usernameExits.id }, process.env.KEY_SECRET, { expiresIn: '1h' });
                res.status(200).json({
                    success: true,
                    message: 'usuario autenticado!',
                    username: usernameExits.username,
                    id: usernameExits.id,
                    rol: usernameExits.rolName,
                    fullname: usernameExits.fullname,
                    token
                });

            } else {
                res.status(500).json({ success: false, message: 'contraseña de usuario incorrecta' });
            }


        } else {
            res.status(500).json({ success: false, message: 'usuario incorrecto!' });
        }



    } catch (error) {
        console.log(error);
    }
}

async function authorizationUser(req, res) {
    try {
        const { token } = req.headers;

        if (token) {
            const { userId } = await jwt.verify(token, process.env.KEY_SECRET);

            const user = await User.getUserIdAuthorization(userId);


            if (user) {
                res.status(200).json({ success: true, message: 'token valido y usuario permitido', user });
            } else {
                throw new Error;
            }
        } else {
            throw new Error;
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'token invalido y usuario no valido', user: false });
    }
}

async function getUser(req, res) {
    try {
        const { id } = req.params;
        const user = new User();
        const data = await user.getUserId(id);

        res.status(200).json({ success: true, user: data });

    } catch (error) {
        console.log(error);
        res.status(200).json({ success: false });
    }
}

async function updateUserId(req, res) {
    try {
        const { id } = req.params;
        let { username, password, fullname, licence, fk_area, fk_rol } = req.body;
        password = await encryptingPassword(password);
        let user = {
            username,
            password,
            fullname,
            licence,
            fk_area,
            fk_rol
        }
        const response = await User.updateUserId(id, user);

        if (response.affectedRows) {
            res.status(200).json({ success: true, message: 'Usuario actualizado' });

        } else {
            throw Error;
        }
    } catch (error) {
        res.status(200).json({ success: false, message: 'Usuario no actualizado' });
    }
}

async function deleteUserId(req, res) {
    try {
        const { id } = req.params;
        const user = new User();
        const data = await user.deleteUserId(id);
        console.log(data);
        res.status(200).json({ success: true, message: 'usuario eliminado' });

    } catch (error) {

        res.status(200).json({ success: false, message: 'usuario no eliminado' });
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUserId,
    deleteUserId,
    authenticateUser,
    authorizationUser
}