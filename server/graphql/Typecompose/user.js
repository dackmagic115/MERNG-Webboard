const { composeWithMongoose } = require('graphql-compose-mongoose')
const User = require('../Model/user')

const customizationOptions = {}
const UserTC = composeWithMongoose(User,  customizationOptions)

module.exports = UserTC