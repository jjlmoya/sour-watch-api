const { sendNotification } = require('../notification')

const ACTIONS = {
    CREATE_POST: require('./create_post')
}

const sendAction = async (action, options, models) => {
    const { notification, updateValues } = ACTIONS[action]
    const valuesToUpdate = await updateValues(options)

    await updateUser(options.user, valuesToUpdate)

    if (notification.message) {
        const message = notification.message(options)
        const url = notification.url ? notification.url(options) : ''
        if (message) {
            await sendNotification({
                message,
                typeId: notification.type,
                url
            }, [(options.user).id], models.Notification)
        }
    }
}

const updateUser = async (user, valuesToUpdate, progressInfo, models) => {
    if (valuesToUpdate) {
        await user.update(valuesToUpdate)
    }
}
module.exports = {
    sendAction,
    ACTIONS
}
