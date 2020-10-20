
const ACTIONS_PARAMS = {
    name: 'CREATE_POST',
    experience: 1500,
    maxActions: 10,
    notification: {
        type: 13
    }
}

const updateValues = async ({ user }) => {
    const newTopics = (user).topics + 1
    return {
        topics: newTopics
    }
}

module.exports = {
    ...ACTIONS_PARAMS,
    updateValues
}
