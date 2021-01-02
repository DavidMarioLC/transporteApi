const bcrypt = require('bcrypt');

async function encryptingPassword(password) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;

}


module.exports = {
    encryptingPassword
}