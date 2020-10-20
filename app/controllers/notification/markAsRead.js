
const { Notification } = require('../../models')
const { Op } = require('sequelize')

module.exports = async (req, res, next) => {
    try {
        const read = req.body
        if (read && read.length > 0) {
            await Notification.update({
                read: true
            },
            { where: { id: { [Op.or]: read } } })
        }

        res.json({
            status: 200,
            message: 'Success'
        })
    } catch (error) {
        res.status(500).json(error)
    }
}
