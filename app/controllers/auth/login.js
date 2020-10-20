const { AuthException, authCodes } = require('./../../exceptions')
const bcrypt = require('bcrypt')
const { User, Role } = require('../../models')
const { createAccessToken, setRefreshToken } = require('../../utils/token')
const dayjs = require('dayjs')
const MAX_TIME_BLOCKED = 180
const STEP_BLOCKED_TIME = 15
const FREE_ATTEMPTS = 2

const calculateBlockedTimeByAttempt = (attempt) => {
    if (attempt <= FREE_ATTEMPTS) return 0
    const currentBlockedTime = attempt - FREE_ATTEMPTS * STEP_BLOCKED_TIME
    return currentBlockedTime <= MAX_TIME_BLOCKED
        ? currentBlockedTime
        : MAX_TIME_BLOCKED
}

module.exports = async (req, res) => {
    try {
        const { email, password } = req.body
        const userInfo = await User.findOne({
            where: {
                email
            },
            attributes: ['id', 'name', 'slug', 'email', 'password'],
            include: {
                model: Role,
                as: 'role'
            }
        })

        if (!userInfo) {
            throw new AuthException(authCodes.WRONG_EMAIL, { msg: `Email does not exist: ${email}` })
        }
        const user = (userInfo).toJSON()
        const passwordMatch = bcrypt.compareSync(password, user.password)

        if (isBlockedUser(userInfo)) {
            const blockedTime = calculateBlockedTimeByAttempt((userInfo).attempts)
            throw new AuthException(authCodes.BLOCKED_USER_LOGIN,
                {
                    msg: `Blocked user ${blockedTime}`,
                    value: blockedTime
                })
        }

        if (!passwordMatch) {
            addTry(userInfo)
            throw new AuthException(authCodes.WRONG_PASSWORD, { msg: `Wrong password for user ${userInfo.name} with email ${email}` })
        }
        delete user.password
        deleteTry(userInfo)
        await setRefreshToken(user, res)
        res.status(200).json(createAccessToken({ user }, user))
    } catch (error) {
        let code = 500
        console.error(error)
        if (error instanceof AuthException) code = 401
        res.status(code).json(error)
    }
}

const addTry = (user) => {
    user.update({
        attempts: (user).attempts + 1,
        lastAttempt: dayjs()
    }, { type: 'login' })
}

const deleteTry = (user) => {
    user.update({
        attempts: 0
    }, { type: 'login' })
}

const isBlockedUser = ({ attempts, lastAttempt }) =>
    dayjs()
        .add(calculateBlockedTimeByAttempt(attempts), 'seconds')
        .isBefore(dayjs(lastAttempt))
