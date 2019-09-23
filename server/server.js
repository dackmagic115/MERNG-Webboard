const express = require('express')
const connectDB = require('./config/db')

require('dotenv').config()

const app = express()

connectDB()


app.get('/',(req,res) => res.send('GRAPHQL SERVER RUNNING'))

app.listen(process.env.PORT, () => console.log(`Graphql Server on PORT ${process.env.PORT}`))