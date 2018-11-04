const express = require('express');
let router = express.Router();
const DBController = require('./DBController');

router.get('/',(req,res)=>
{
    res.send('Sucessfully did stuff')
});

router.post('/save',(req,res)=>{
    let newPlayer = new DBController.Player({
        _id:DBController.makeId(),

    });

  console.log(req.body);

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
    DBController.Player.findOne({_id:id}).exec((err,results)=>{
        res.send(results)
    })
    }
);

module.exports = router;