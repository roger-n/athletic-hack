const express = require('express');
let router = express.Router();
const DBController = require('./DBController');

router.get('/',(req,res)=>
{
    res.send('Sucessfully did stuff')
});

router.post('/save',(req,res)=>{
   let newPlayer = new DBController.Player({
       name: req.body.name,
       coordList: req.body.coordsList
    });


    newPlayer.save().then(()=>{
        console.log("Successfully saved player")
        res.send("Saved")
    })
});

router.get('/players',(req,res)=>{
    DBController.Player.find().exec((err,results)=>{
        res.json(results)
    })
});

router.get('/players/:id',(req,res)=>{
    DBController.updateData(req.params.id)
    res.send("SHIT")
    });


module.exports = router;