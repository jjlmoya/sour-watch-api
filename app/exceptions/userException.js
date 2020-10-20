class ExtendabledError extends Error {
    constructor (message) {
        super(message)
        this.name = 'UserException'
    }
}

class UserException extends ExtendabledError {
    constructor (code, msg = '') {
        super(`code ${code}`)
        this.args = {
            type: 'user',
            code,
            msg: `[Error: ${this.name}] with code ${code}: ${msg}`
        }
    }
}

const userCodes = {
    DUPLICATED_NAME: 1,
    DUPLICATED_EMAIL: 2
}

module.exports = {
    UserException,
    userCodes
}
