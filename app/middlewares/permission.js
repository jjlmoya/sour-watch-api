const { User } = require('../models')
const { verifyToken } = require('../utils/token')
const authConfig = require('../../config/auth')
const ROLES = require('./roles')
const withModifiers = async (req, res, next) => {
    next()
}

const onlyAdmin = async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({ msg: 'Not enough permissions' })
    } else {
        const token = req.headers.authorization.split(' ')[1]
        verifyToken(token, authConfig.accessTokenSecret, res, async ({ user }) => {
            const userEntry = await User.findByPk(user.id, { attributes: ['id', 'roleId'] })
            const rol = (userEntry).roleId
            if (rol === ROLES.ADMIN) {
                next()
            } else {
                res.status(401).json({ msg: 'Not enough permissions' })
            }
        })
    }
}

const onlyWriters = async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({ msg: 'Not enough permissions' })
    } else {
        const token = req.headers.authorization.split(' ')[1]
        verifyToken(token, authConfig.accessTokenSecret, res, async ({ user }) => {
            const userEntry = await User.findByPk(user.id, { attributes: ['id', 'roleId'] })
            const rol = (userEntry).roleId
            if (rol === ROLES.ADMIN || rol === ROLES.WRITER) {
                next()
            } else {
                res.status(401).json({ msg: 'Not enough permissions' })
            }
        })
    }
}

const onlyUsers = async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({ msg: 'Not enough permissions' })
    } else {
        const token = req.headers.authorization.split(' ')[1]
        verifyToken(token, authConfig.accessTokenSecret, res, async ({ user }) => {
            next()
        })
    }
}
module.exports = {
    onlyAdmin,
    onlyWriters,
    onlyUsers,
    withModifiers
}
