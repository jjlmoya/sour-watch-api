const axios = require('axios')
const { User, Role } = require('../../models')
const { createAccessToken, setRefreshToken } = require('../../utils/token')
const authConfig = require('../../../config/auth')

module.exports = async (req, res) => {
    try {
        const { token, network } = req.body
        const data = await getDataByNetwork(network, token)
        const userInfo = await User.findOne({
            where: {
                email: data.email
            },
            include: {
                model: Role,
                as: 'role'
            }
        })

        const user = userInfo ? userInfo.toJSON() : false

        if (user) {
            delete user.password
            await setRefreshToken(user, res)
            res.status(200).json({ registered: true, ...createAccessToken({ user }, user) })
        } else {
            res.status(200).json({ registered: false, ...data })
        }
    } catch (e) {
        console.error(e)
        res.status(500).json(e)
    }
}

const getGoogleToken = async (code) => {
    const { data } = await axios.post(authConfig.googleAuthTokenEndpoint, {
        client_id: authConfig.googleAuthId,
        client_secret: authConfig.googleAuthSecret,
        redirect_uri: authConfig.googleAuthRedirectUri,
        grant_type: 'authorization_code',
        code
    })

    return {
        accessToken: data.access_token
    }
}

const getGoogleUserProfile = async (accessToken) => {
    return await axios.get(authConfig.googleAuthUserInfoEndpoint, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

const getGoogleDataByToken = async (token) => {
    const { accessToken } = await getGoogleToken(token)
    const userProfileData = await getGoogleUserProfile(accessToken)
    const { email, name } = userProfileData.data
    return {
        email,
        network: 'google',
        name
    }
}

const getDataByNetwork = async (network, token) => {
    switch (network) {
    case 'google':
        return await getGoogleDataByToken(token)
    default:
        return {}
    }
}
