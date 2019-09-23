const mongoose = require('mongoose')
const postSchema = require('../Schema/posts')

module.exports = mongoose.model('post', postSchema)