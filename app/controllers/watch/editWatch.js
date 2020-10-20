const { Post, User, Notification } = require('../../models')
const { sendAction, ACTIONS } = require('../../services/actions')

module.exports = async (req, res, next) => {
    try {
        const {
            authorId,
            title,
            content,
            image,
            video,
            overpostDate,
            categoryId,
            postTypeId,
            gameId
        } = req.body
        const id = +req.params.id
        const post = await Post.findByPk(id, { attributes: ['authorId', 'categoryId'] })
        await post.update(
            { id, title, content, image, video, overpostDate, categoryId, authorId, postTypeId, gameId },
            {
                where: { id }
            }
        )
        const user = await User.findByPk((post).authorId)
        await sendAction(ACTIONS.EDIT_POST.name, { user }, { Notification })

        res.json({
            status: 200,
            message: 'Success',
            content: post
        })
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}
