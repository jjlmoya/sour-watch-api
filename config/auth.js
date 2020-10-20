require('dotenv').config()
const {
    googleConfiguration
} = require('./social')

module.exports = {
    accessTokenSecret: process.env.AUTH_TOKEN_SECRET,
    refreshTokenSecret: process.env.AUTH_REFRESH_TOKEN_SECRET,
    encryptToken: process.env.AUTH_ENCRYPT_TOKEN,
    expiresIn: process.env.AUTH_EXPIRES_IN,
    salt: parseInt(process.env.AUTH_SALT),
    recoverExpirationTime: process.env.AUTH_RECOVER_EXPIRATION_TIME,
    recoverUri: process.env.AUTH_RECOVER_URI,
    ...googleConfiguration
}
