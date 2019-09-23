const express = require('express')
const grahpqlHTTP = require('express-graphql')
const bodyparser = require('body-parser')
const cors = require('cors')

require('dotenv').config()



// import file
const connectDB = require('./config/db')
const Graphql = require('./graphql')


const app = express()

connectDB()

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
      
    );
    next();
  });

app.use(cors())

app.use(express.json({ extend : false }))

app.use(bodyparser.json())

app.use('/graphql',grahpqlHTTP(req =>({
    schema:Graphql,
    rootValue:Graphql,
    graphiql:true,
    customFormatErrorFn(err){
      if(!err.originalError){
        return err
      }
      const data = err.originalError.data;
      const message = err.message || 'An error occurred.'
      const code = err.originalError.code || 500
      return { message: message , status : code , data:data}
    }
})))


app.get('/',(req,res) => res.send('GRAPHQL SERVER RUNNING'))

app.listen(process.env.PORT, () => console.log(`Graphql Server on PORT ${process.env.PORT}`))