const bcrypt = require('bcrypt');

async function checkingPassword(currentPasswordDB, password) {

    let result = await bcrypt.compare(password, currentPasswordDB);
    return result;

}





module.exports = {
    checkingPassword
}