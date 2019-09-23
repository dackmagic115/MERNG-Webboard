const PostTC = require('../Typecompose/post')

const objpost = {
    postMany : PostTC.getResolver('findMany')
}

module.exports = objpost