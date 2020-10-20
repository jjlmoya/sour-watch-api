const {
    addPage
} = require('../controllers/pageviews')

module.exports = (router) => {
    router.post('/analytics/pageview/', addPage)
    return router
}
