const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const authConfig = require('../../../config/auth')
const { RefreshToken } = require('../../models')

const createAccessToken = (dataToken, user) => {
    return {
        accessToken: jwt.sign(dataToken, authConfig.accessTokenSecret, { expiresIn: authConfig.expiresIn }),
        user
    }
}

const setRefreshToken = async (user, res) => {
    const refreshToken = jwt.sign({ user }, authConfig.refreshTokenSecret)
    const encryptedCookie = crypto.AES.encrypt(refreshToken, authConfig.encryptToken).toString()

    res.cookie('sessionToken', encryptedCookie, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
        sameSite: 'Strict'
    })

    await RefreshToken.create({
        token: refreshToken,
        userId: user.id
    })
}

const decryptToken = (token) => {
    return crypto.AES.decrypt(decodeURIComponent(token), authConfig.encryptToken).toString(crypto.enc.Utf8)
}

const verifyToken = (token, secret, res, handler) => {
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            res.status(401).json({ msg: 'Es necesario que inicies sesión para continuar.' })
        } else {
            handler(decoded)
        }
    })
}

module.exports = {
    setRefreshToken,
    decryptToken,
    verifyToken,
    createAccessToken
}
