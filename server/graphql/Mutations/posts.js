const PostTC = require('../Typecompose/post')
const validator = require('validator')

const Users = require('../Model/user')
const Posts = require('../Model/posts')

PostTC.addResolver({
    name:'PostCreate',
    type:PostTC,
    args:{
        record:`input InputInfo{
            body:String
        }`
    },
    resolve: async ({ context , args }) =>{
        const { auth , userId } = context
        const { body } = args.record
        console.log("Create")

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

        return post
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

PostTC.addResolver({
    name:'PostComment',
    type:PostTC,
    args:{
        record:`input CommentInput{
            postId : MongoID
            body : String
        }`
    },
    resolve: async ({args , context}) =>{
        const { postId , body } = args.record
        const { auth , userId } = context

        if(!auth){
            throw new Error('UnAuthenicated')
        }

        const post =  await Posts.findById({_id:postId})
        if(post){
            const user = await Users.findById({_id:userId}).select('-password')

            post.comments.unshift({
                body,
                username:user.username,
                createAt: new Date().toISOString()
            })
            await post.save()
            return post
        } else throw new Error('ไม่มีโพสต์ นี้อยู่')
    }

})

PostTC.addResolver({
    name:"DeleteComments",
    type:PostTC,
    args:{
        record:`input DeleteComment{
            commentId : MongoID
            postId : MongoID
        }`
    },
    resolve: async({args , context}) =>{
        const { auth , userId } = context
        const { postId , commentId } = args.record

        console.log('commentId : ' , commentId )

        if(!auth){
            throw new Error('UnAuthenicated')
        }
        const post = await Posts.findById({_id : postId})
        console.log(post)
        const comment = await post.comments.find(comment => comment.id === commentId)
        console.log(comment)

        if(!comment) {
            throw new Error('คุณยังไม่ได้คอมเม้นเลย')
        }

        const user = Users.findById({_id:userId})

        const removeIndex = post.comments.map(comment => comment.username.toString().indexOf(user.username))

        post.comments.splice(removeIndex,1)

        await post.save()

        return post
    }
})

PostTC.addResolver({
    name:"LikePost",
    type:PostTC,
    args:{
        record:`input LikeComment{
            postId : MongoID
        }`
    },
    resolve: async({args , context}) =>{
        const { auth , userId } = context
        const { postId } = args.record

        if(!auth){
            throw new Error('UnAuthenicated')
        }
        const post =  await Posts.findById({_id:postId})
        console.log(post)
        const User = await Users.findById({_id:userId})
        if(post){
            if(post.Likes.find(like => like.username === User.username)){
                console.log('ลบ like')
                /// logic นี้ใช้ได้เฉพาะตอนมีน้อยๆ ถ้ามีเยอะน่าจะหานาน
                post.Likes = post.Likes.filter(like => like.username !==  User.username)
                console.log(post.Likes)
            }else{

                post.Likes.push({
                    username:User.username,
                    createAt: new Date().toISOString()
                })
            }
            await post.save()
            return post
        } 
        else throw new Error('ไม่มี โพสต์นี้อยู่')

    }
})


const objpost = {
    PostCreate : PostTC.getResolver('PostCreate'),
    PostDelete : PostTC.getResolver('DeletePost'),
    CommentPost : PostTC.getResolver('PostComment'),
    CommentDelete : PostTC.getResolver('DeleteComments'),
    LikePost : PostTC.getResolver('LikePost')

}

module.exports = objpost