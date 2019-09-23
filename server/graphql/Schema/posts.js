const { Schema } = require('mongoose')

const postSchema = new Schema({
    body:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    createAt:{
        type:String
    },
    comments:[
        {
            body:{
                type:String,
                require:true
            },
            username:{
                type:String,
                require:true,
                ref:'users'
            },
            createAt:{
                type:String
            }
        }
    ],
    Likes:[
        {
            username:{
                type:String,
                require:true,
                ref:'users'
            },
            createAt:{
                type:String
            }
        }
    ],
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    }
})

module.exports = postSchema