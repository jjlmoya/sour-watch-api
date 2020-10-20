const login = require('./login')
const register = require('./register')
const token = require('./token')
const logout = require('./logout')
const social = require('./social')
const recover = require('./recover')
const recoverCheck = require('./recoverCheck')
module.exports = {
    login,
    register,
    token,
    logout,
    social,
    recover,
    recoverCheck
}
