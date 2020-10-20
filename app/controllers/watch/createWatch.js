const { Watch } = require('../../models')
const slugify = require('slugify')
module.exports = async (req, res, next) => {
    try {
        const {
            authorId, title, content, image, video,
            overpostDate, team, categoryId, postId,
            stateId, postTypeId, gameId
        } = req.body

        const watch = await Watch.create({
            title,
            slug: slugify(title),
            content,
            image,
            video,
            overpostDate,
            team,
            categoryId,
            postId,
            stateId,
            authorId,
            postTypeId,
            gameId
        })

        res.json({
            status: 200,
            message: 'Success',
            content: watch
        })
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}
