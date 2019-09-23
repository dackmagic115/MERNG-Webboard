const PostTC = require('../Typecompose/post')
const validator = require('validator')

const Users = require('../Model/user')
const Posts = require('../Model/posts')

PostTC.addResolver({
    name:'PostCreate',
    type:`type PostInfo{
        id:MongoID
        body:String
        createdAt: String
        username: String
    }`,
    args:{
        record:`input InputInfo{
            body:String
        }`
    },
    resolve: async ({ context , args }) =>{
        const { auth , userId } = context
        const { body } = args.record
        console.log(userId)

        if(!auth){
            throw new Error('UnAuthenicated')
        }

        const errors = []

        if(validator.isEmpty(body)){
            errors.push('กรุณากรอกโพสต์')
        }
        if(errors.length > 0){
            const error = newError('กรอกข้อมูลไม่ครบ')
            error.data = errors
            error.code = 422
            throw error
        }

        const User = await Users.findById({_id:userId}).select('-password')
        const newPosts = new Posts({
            body : body,
            user: User.id,
            username: User.username,
            createAt: new Date().toISOString()
        })

        const post = await newPosts.save()

        return { id: post._id , body:post.body , createdAt:post.createAt , username : post.username }
    }
})

PostTC.addResolver({
    name:"DeletePost",
    type:`type message{
        Message:String
    }`,
    args:{
        record:`input PostsId{
            postId : MongoID
        }`
    },
    resolve: async ({context , args}) =>{
        const { postId } = args.record
        const { auth , userId} = context

        if(!auth){
            throw new Error('UnAuthenicated')
        }
        const post = await Posts.findById({_id:postId})
        console.log(userId , post.user)
        if(post.user.toString() === userId.toString()){
            await post.delete()
            return { Message : 'ลบโพสต์ เรียบร้อยแล้ว' }
        }else{
            return { Message : 'คุณไม่มีสิทธิ์ในการลบโพสต์นี้' }
        }

        
    }
})

const objpost = {
    PostCreate : PostTC.getResolver('PostCreate'),
    PostDelete : PostTC.getResolver('DeletePost')
}

module.exports = objpost