const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Connect to MONGODB database
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true}).then(()=>{
 console.log("Connected to MongoDB Server")
});

let routes = require('./routes/route.js');

app.use('/',routes);
console.log('Express started. Listening on port',process.env.PORT||5000);
app.listen(process.env.PORT||5000);