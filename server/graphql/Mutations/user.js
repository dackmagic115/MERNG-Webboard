const UserTC = require('../Typecompose/user')

const objuser = {
    createUser : UserTC.getResolver('createOne')
}

module.exports = objuser