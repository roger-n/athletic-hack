const express = require('express');
let router = express.Router();
const DBController = require('./DBController');

router.get('/',(req,res)=>
{
    DBController.findAvgPoint('Philippe Desrosiers');
    res.send('Sucessfully did stuff')
})

router.post('/save',(req,res)=>{
    console.log("Post request has been sent")
    res.send("Saved")
});


module.exports = router;