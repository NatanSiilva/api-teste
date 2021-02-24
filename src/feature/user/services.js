const db = require('../../_db/models')

module.exports = {
    create: payload => db.Users.create(payload),
}