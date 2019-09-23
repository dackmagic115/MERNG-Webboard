const PostTC = require('../Typecompose/post')



const objpost = {
    postMany : PostTC.getResolver('findMany'),
    postById : PostTC.getResolver('findById')
}

module.exports = objpost