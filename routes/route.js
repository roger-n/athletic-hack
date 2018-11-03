const express = require('express');
let router = express.Router();
const DBController = require('./DBController');

router.get('/',(req,res)=>
{
    DBController.findAvgPoint('Philippe Desrosiers');
    res.send('Sucessfully did stuff')
})

router.post('/save',(req,res)=>{
<<<<<<< HEAD
    console.log("Post request has been sent")
=======
  console.log(req.body);
>>>>>>> 82033cc376eed9af7a963f50566157da486db343
    res.send("Saved")
});


module.exports = router;