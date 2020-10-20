const { onlyWriters } = require('../middlewares/permission')
const {
    getWatches,
    createWatch,
    deleteWatch,
    editWatch
} = require('../controllers/watch')

module.exports = (router) => {
    router.get('/watches', getWatches)
    router.post('/watches', onlyWriters, createWatch)
    router.delete('/watches/:id', deleteWatch)
    router.patch('/watches/:id', editWatch)

    return router
}
