const sendNotification = async (notification, users, Notification) => {
    const usersNotification = users.map((user) => ({
        receiverId: user,
        ...notification
    }))
    await Notification.bulkCreate(usersNotification)
}

module.exports = {
    sendNotification
}
