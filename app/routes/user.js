const {
    getUser,
    getNotifications
} = require('../controllers/user')

module.exports = (router) => {
    router.get('/users/:user/', getUser)
    router.get('/users/:user/notifications', getNotifications)

    return router
}
