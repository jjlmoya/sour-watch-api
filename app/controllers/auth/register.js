const bcrypt = require('bcrypt')
const { User, Role } = require('../../models')
const authConfig = require('../../../config/auth')
const { createAccessToken, setRefreshToken } = require('../../utils/token')
const DEFAULT_USER_ROLE = 1

module.exports = async (req, res) => {
    try {
        const createdUser = await User.create({
            roleId: DEFAULT_USER_ROLE,
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, authConfig.salt)
        })

        const userInfo = await User.findByPk(createdUser.id, {
            attributes: {
                exclude: ['password']
            },
            include: {
                model: Role,
                as: 'role'
            }
        })

        const user = (userInfo).toJSON()
        await setRefreshToken(user, res)
        res.json(createAccessToken({ user }, user))
    } catch (error) {
        let code = 500
        if (error.errors) {
            error.errors.forEach((err) => {
                const c = err.original.args.code
                if (c === 1 || c === 2) code = 409
            })
        }

        res.status(code).json(error)
    }
}
