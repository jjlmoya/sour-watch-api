class ExtendabledError extends Error {
    constructor (message) {
        super(message)
        this.name = 'AuthException'
    }
}

class AuthException extends ExtendabledError {
    constructor (code, { msg = '', value = '' }) {
        super(`code ${code}`)
        this.args = {
            type: 'auth',
            code,
            msg: `[Error: ${this.name}] with code ${code}: ${msg}`,
            value
        }
    }
}

const authCodes = {
    WRONG_EMAIL: 1,
    EMAIL_DOES_NOT_EXIT: 2,
    RECOVER_TOKEN_EXPIRED: 3,
    WRONG_RECOVER_URI: 4,
    BLOCKED_USER_LOGIN: 5,
    WRONG_PASSWORD: 6
}

module.exports = {
    AuthException,
    authCodes
}
