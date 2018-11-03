const express = require('express');
let router = express.Router();
const DBController = require('./DBController');


router.use('/',(req,res)=>{
    res.send("Properly redirected")
});


module.exports = router;