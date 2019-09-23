const UserTC = require('../Typecompose/user')


const objuser = {
    userMany: UserTC.getResolver('findMany'),
}

module.exports = objuser