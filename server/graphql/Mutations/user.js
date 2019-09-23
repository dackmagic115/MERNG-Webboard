const UserTC = require('../Typecompose/user')
const User = require('../Model/user')

const bcypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')

UserTC.addResolver({
    name:'Register',
    type:`type RegisterPayload{
        _id:MongoID
        email:String
        token:String
        username:String
        createAt:String
    }`,
    args:{
        record : `input UserInfo{
                    username:String,
                    password:String,
                    confirmpassword:String,
                    email: String
        }`},
    resolve : async ({ args }) =>{
        const { username , password , confirmpassword , email } = args.record

        const errors = []

        if(validator.isEmpty(email)){
            errors.push({message : 'กรุณากรอก email'})
        }else if(!validator.isEmail(email)){
            errors.push({message: 'กรุณากรอก email ให้ถูกต้อง'})
        }

        if(validator.isEmpty(username)){
            errors.push({message:'กรุณากรอก username'})
        }

        if(validator.isEmpty(password)){
            errors.push({message: 'กรุณากรอก password'})
        }else if (validator.isEmpty(confirmpassword)){
            errors.push({message: 'กรุณายืนยัน password'})
        }else{
            if(password !== confirmpassword){
                errors.push({message:'password ไม่ตรงกัน'})
            }
        }

        if(errors.length > 0){
            const error = new Error('กรอกข้อมูลให้ถูกต้อง')
            error.data = errors
            error.code = 422
            throw error
        }

        const matchUser = User.findOne({username: username})
        if(matchUser){
            const error = new Error('มี username นี้อยู่แล้ว')
            throw error
        }
        
        const Password = await bcypt.hash(password, 12)

        const newUser = new User({
            email,
            username,
            password : Password,
            createdAt: new Date().toISOString()
        })

        const res = await newUser.save()

        const token = generateToken(res)

        return { _id : res._id , email : res.email , token : token , username: res.username , createAt: res.createdAt }

    }
})


UserTC.addResolver({
    name:'login',
    type:`type UserInfoPayload{
        id:MongoID
        email:String
        token:String
        username:String
        createAt:String
    }`,
    args:{
        record:`input loginInfo{
            username:String
            password:String
        }`
    },
    resolve: async ({args}) =>{
        const { username , password } = args.record

        const errors = []

        if(validator.isEmpty(username)){
            errors.push({message:'กรุณากรอก username'})
        }
        if(validator.isEmpty(password)){
            errors.push({message:'กรุณากรอก password'})
        }

        if(errors.length > 0){
            const error = new Error('กรอกข้อมูลให้ถูกต้อง')
            error.data = errors
            error.code = 422
            throw error
        }

        const user = await User.findOne({ username })

        if(!user){
            const error = new Error('ไม่มี username นี้อยู่ในระบบ')
            throw error
        }

        const match = await bcypt.compare(password , user.password)
        if(!match){
            const error = new Error('ล็อคอิน ผิดพลาด')
            throw error
        }

        const token = generateToken(user)

        return { id:user._id , email : user.email , token:token , username:user.username , createAt:user.createdAt }
    }
})


const generateToken = (user) => {
    return jwt.sign(
        {
            id:user.id,
            email: user.email,
            username: user.username
        },
        process.env.jwtkey,
        {expiresIn:'1h'}
    )
}


const objuser = {
    Register : UserTC.getResolver('Register'),
    Login : UserTC.getResolver('login')
}

module.exports = objuser