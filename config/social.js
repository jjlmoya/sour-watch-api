
const googleConfiguration = {
    googleAuthId: process.env.GOOGLE_AUTH_ID,
    googleAuthSecret: process.env.GOOGLE_AUTH_SECRET,
    googleAuthEndpoint: process.env.GOOGLE_AUTH_ENDPOINT,
    googleAuthTokenEndpoint: process.env.GOOGLE_AUTH_TOKEN_ENDPOINT,
    googleAuthCertsEndpoint: process.env.GOOGLE_AUTH_CERTS_ENDPOINT,
    googleAuthUserInfoEndpoint: process.env.GOOGLE_AUTH_USER_INFO_ENDPOINT,
    googleAuthRedirectUri: process.env.GOOGLE_AUTH_REDIRECT_URI
}

module.exports = {
    googleConfiguration
}
