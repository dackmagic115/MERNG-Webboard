const PostTC = require('../Typecompose/post')


const objpost = {
    PostCreate : PostTC.getResolver('createOne')
}

module.exports = objpost