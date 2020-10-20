const { Watch } = require('../../models')
const { setPagination, paginationResults } = require('../../utils/pagination')

module.exports = async (req, res, next) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 10
        const pagination = setPagination(req.query.page, limit)

        const { rows, count } = await Watch.findAndCountAll({
            offset: pagination.offset,
            limit
        })
        const results = paginationResults(pagination, count)
        results.items = rows

        res.json(results)
    } catch (error) {
        res.status(500).json(error)
    }
}
