const {
    markAsRead
} = require('../controllers/notification')

module.exports = (router) => {
    router.post('/notification/read/', markAsRead)
    return router
}
