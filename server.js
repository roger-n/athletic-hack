const express = require('express');

const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

//Connect to MONGODB database
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true}).then(()=>{
 console.log("Connected to MongoDB Server")
});

let routes = require('./routes/route.js');
console.log(routes);
app.use('/',routes);
console.log('Express started. Listening on port',process.env.PORT||3000);
app.listen(process.env.PORT||3000);