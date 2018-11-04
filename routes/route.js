const express = require('express');
let router = express.Router();
const DBController = require('./DBController');

router.get('/',(req,res)=>
{
    res.send('Sucessfully did stuff')
});

router.post('/save',(req,res)=>{
  console.log(req.name);
<<<<<<< HEAD
=======
  console.log('post request has been made');
>>>>>>> 71720dc48573598c4054021bb2096245d085039d
    res.send("Saved")
});


module.exports = router;