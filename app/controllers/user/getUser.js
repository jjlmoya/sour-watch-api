
const { User, Role, Achievement, Personalization, PersonalizationType } = require('../../models')
const { Op, literal } = require('sequelize')
const { getValueByKey } = require('../../services/commonsData')

module.exports = async (req, res, next) => {
    try {
        const userId = req.params.user
        const totalAchievements = await getValueByKey('achievements')
        const user = await User.findOne({
            attributes: {
                exclude: ['password', 'recoverToken', 'expireToken', 'attemps', 'lastAttempt']
            },
            where: {
                [Op.or]: [
                    { id: userId },
                    { name: userId }
                ]
            },
            include: [
                {
                    model: Role,
                    as: 'role'
                },
                {
                    model: Achievement,
                    as: 'achievements',
                    attributes: [
                        [literal('(SELECT COUNT(*) FROM achievementsusers where AchievementsUsers.userId = user.id GROUP BY AchievementsUsers.userId)'), 'current']
                    ],
                    group: ['achievements.id'],
                    through: {
                        attributes: []
                    }
                },
                {
                    model: Personalization,
                    as: 'personalizations',
                    include: {
                        model: PersonalizationType,
                        as: 'type'
                    },
                    through: {
                        attributes: [],
                        where: {
                            isActive: true
                        }
                    }
                }
            ]
        })
        const userInfo = (user).toJSON()
        res.json({
            ...userInfo,
            achievements: {
                current: getCurrentAchievements(userInfo),
                total: +totalAchievements
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

const getCurrentAchievements = ({ achievements = [] }) => achievements.length > 0
    ? achievements[0].current
    : 0
