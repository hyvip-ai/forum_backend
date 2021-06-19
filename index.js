const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const mongodb = 'mongodb://localhost:27017/forum'
const port = 3000
app.use(cors());
const default_routes = require('./routes/default')
const user_routes = require('./routes/user')

const forum_routes = require('./routes/forum')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

const mongoose = require('mongoose')
mongoose.connect( mongodb, { useNewUrlParser : true, useUnifiedTopology : true})
.then((res)=>{
    app.listen(port,()=>{
        console.log('> Connected...');
        console.log('> Write Some Code Moron....!!');
    })
})
.catch(err=>console.log(`> Error while connecting to mongoDB : ${err.message}` ))


app.use('/',default_routes)

app.use('/api',user_routes)

app.use('/api',forum_routes)