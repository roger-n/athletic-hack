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


    newPlayer.save().then((results)=>{
        console.log("Successfully saved player")
        DBController.updateData(results._id)
        res.send("Saved")
    })
});

router.post('/delete/:id',(req,res)=>{
    DBController.Player.findByIdAndDelete(req.params.id).then(()=>{
        console.log("Deleted entry")
    })
});
router.get('/players',(req,res)=>{
    DBController.Player.find().exec((err,results)=>{
        res.json(results)
    })
});

router.get('/players/:id',(req,res)=>{
    DBController.updateData(req.params.id)
    DBController.Player.findById(req.params.id).then((results)=>{
        res.send(results)

    })
    });


module.exports = router;