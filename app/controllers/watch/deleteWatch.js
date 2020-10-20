const { Watch } = require('../../models')
module.exports = async (req, res, next) => {
    try {
        const { id } = req.params
        await Watch.delete({ where: { id } })

        res.json({
            code: 200,
            message: 'success'
        })
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}
