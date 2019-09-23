const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MongoURI,{
            useNewUrlParser: true,
            useUnifiedTopology: true 
        })

        console.log('MongoDB connect...')
    }catch(err){
        console.log(err.message)
        
        process.exit()
    }
}

module.exports = connectDB