const { PageView } = require('../../models')
const { TYPES } = require('../../services/analytics/pageview')

module.exports = async (req, res, next) => {
    try {
        const {
            userId,
            url
        } = req.body
        const typeId = getPageTypeByUrl(url)
        await PageView.create({
            userId,
            url,
            typeId
        })

        res.json({
            status: 200,
            message: 'Success'
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

const getPageTypeByUrl = (url) => {
    if (url === '/') return TYPES.HOME

    if (contains(url, '/post')) return TYPES.POST

    return TYPES.UNKNOWN
}

const contains = (url, subpath) => url.indexOf(subpath) > -1
