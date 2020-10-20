const jwt = require('jsonwebtoken')
const { decryptToken, createAccessToken } = require('../../utils/token')
const { RefreshToken } = require('../../models')
const authConfig = require('../../../config/auth')

module.exports = async (req, res) => {
    try {
        const authorization = req.headers.authorization
        const sessionCookie = req.cookies.sessionToken

        if (authorization && sessionCookie) {
            const accessToken = authorization.split(' ')[1]
            const sessionToken = decryptToken(req.cookies.sessionToken)

            jwt.verify(accessToken, authConfig.accessTokenSecret, (error, data) => {
                if (!error) {
                    res.json({ accessToken, user: data.user })
                } else {
                    jwt.verify(sessionToken, authConfig.refreshTokenSecret, async (error, data) => {
                        if (!error) {
                            try {
                                const refreshToken = await RefreshToken.findOne({ where: { token: sessionToken } })
                                if ((refreshToken).token) {
                                    res.json(createAccessToken({ user: data.user }, data.user))
                                } else {
                                    res.status(401).json({ msg: 'Es necesario que inicies sesión para continuar.' })
                                }
                            } catch (error) {
                                res.status(401).json({ msg: 'Es necesario que inicies sesión para continuar.' })
                            }
                        } else {
                            res.status(401).json({ msg: 'Es necesario que inicies sesión para continuar.' })
                        }
                    })
                }
            })
        } else {
            res.status(401).json({ msg: 'Es necesario que inicies sesión para continuar.' })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}
