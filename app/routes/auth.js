const {
    login,
    register,
    token,
    logout,
    social,
    recover,
    recoverCheck
} = require('../controllers/auth')

module.exports = (router) => {
    router.post('/auth/login', login)
    router.post('/auth/register', register)
    router.post('/auth/token', token)
    router.post('/auth/logout', logout)
    router.post('/auth/social', social)
    router.post('/auth/recover', recover)
    router.post('/auth/recover/check', recoverCheck)
    return router
}
