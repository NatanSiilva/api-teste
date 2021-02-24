const controllers = require('./controllers')


module.exports = router => {
    router.post('/v1/api/users', controllers.create)
}