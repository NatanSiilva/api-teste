
const db = require('../../_db/models/')

module.exports = {
    authUser: payload => db.Users.findOne({ where: payload }),
    
}