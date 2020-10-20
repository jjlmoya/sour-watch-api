
const { AuthException, authCodes } = require('../../exceptions')
const { User } = require('../../models')
const dayjs = require('dayjs')

module.exports = async (req, res) => {
    try {
        const { email, token } = req.body
        const user = await User.findOne({
            where: {
                email,
                recoverToken: token
            }
        })

        if (!user) {
            throw new AuthException(authCodes.WRONG_RECOVER_URI, { msg: `Wrong recover uri with email ${email} and token ${token}` })
        }

        if (!isAvailableToken(user.expireRecover)) {
            throw new AuthException(authCodes.RECOVER_TOKEN_EXPIRED, { msg: `Token Expired ${token}` })
        }

        res.status(200).json({
            message: 'success',
            status: 200
        })
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

const isAvailableToken = (expireRecover) =>
    dayjs().isBefore(dayjs(expireRecover))
