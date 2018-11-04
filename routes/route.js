const express = require('express');
let router = express.Router();
const DBController = require('./DBController');

router.get('/',(req,res)=>
{
    res.send('Sucessfully did stuff')
});

router.post('/save',(req,res)=>{
  console.log(req.body);

  console.log('post request has been made');
    res.send("Saved")
});

router.get('/players',(req,res)=>{
    DBController.Player.find().exec((err,results)=>{
        res.json(results)
    })
});

router.get('/players/:id',(req,res)=>{
    DBController.updateData(req.params.id).then(console.log("Updated player info"))
    DBController.Player.findOne({_id:id}).exec((err,results)=>{
        res.send(results)
    })
    }
);

module.exports = router;