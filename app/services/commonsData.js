const { CommonData } = require('../models')
const getValueByKey = async (key) => {
    const resultSet = await CommonData.findOne({ attributes: ['value'], where: { key } })
    return resultSet ? resultSet.value : false
}

module.exports = {
    getValueByKey
}
