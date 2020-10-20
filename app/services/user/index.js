const { Op } = require('sequelize')
const USER_GROUP = {
    admin: [6],
    writers: [4, 5, 6],
    moderators: [3, 5, 6],
    premium: [6, 2]
}
const getUsersByGroup = async (userGroup, User) => {
    const moderators = await User.findAll({
        attributes: ['id'],
        where: {
            roleId: {
                [Op.or]: userGroup
            }
        }
    })
    return moderators.map(({ id }) => id)
}

module.exports = {
    getUsersByGroup,
    USER_GROUP
}
