const express = require('express');
let router = express.Router();
const DBController = require('./DBController');

router.get('/',(req,res)=>
{
    res.send('Sucessfully did stuff')
});

router.post('/save',(req,res)=>{
  console.log(req.name);

  console.log('post request has been made');
    res.send("Saved")
});

router.get('/players',(req,res)=>{
    res.json(DBController.Player.find())
});

module.exports = router;