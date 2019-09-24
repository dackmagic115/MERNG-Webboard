const PostTC = require('../Typecompose/post')
const Post = require('../Model/posts')

PostTC.addResolver({
    name:"LikeCount",
    type:`type LikeInfo{
        Like : Int
    }`,
    args:{
        postId : 'String'
    },
    resolve : async ({args}) =>{
        const { postId } = args
        const post = await Post.findById({_id : postId})

        const count = await post.Likes

        return { Like : count.length }
    }
})


PostTC.addResolver({
    name:"CommentsCount",
    type:`type CommnetInfo{
        Comment : Int
    }`,
    args:{
        postId : 'String'
    },
    resolve : async ({args}) =>{
        const { postId } = args
        const post = await Post.findById({_id : postId})

        const count = await post.Likes

        return { Comment : count.length }
    }
})

const objpost = {
    postMany : PostTC.getResolver('findMany'),
    postById : PostTC.getResolver('findById'),
    likeCount: PostTC.getResolver('LikeCount'),
    commentCount : PostTC.getResolver('CommentsCount')
}

module.exports = objpost