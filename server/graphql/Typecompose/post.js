const { composeWithMongoose } = require( 'graphql-compose-mongoose')
const Post = require('../Model/posts')

const customizationOptions = {}
const PostTC = composeWithMongoose(Post , customizationOptions)

module.exports = PostTC