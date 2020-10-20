const { RefreshToken } = require('../../models')
const { decryptToken } = require('../../utils/token')

module.exports = async (req, res) => {
    try {
        if (req.cookies.sessionToken) {
            const deleteToken = await RefreshToken.destroy({
                where: {
                    token: decryptToken(req.cookies.sessionToken)
                }
            })

            res.clearCookie('sessionToken')
            res.status(200).json(deleteToken)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}
