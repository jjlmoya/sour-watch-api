const { User, Notification } = require('../../models')
const { Op } = require('sequelize')

module.exports = async (req, res, next) => {
    try {
        const userId = req.params.user
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { id: userId },
                    { name: userId }
                ]
            },
            include: {
                model: Notification,
                as: 'notifications'
            },
            attributes: []
        })
        res.json({ items: user.notifications })
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}
