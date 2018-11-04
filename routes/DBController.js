const mongoose = require('mongoose');

const playerSchema= mongoose.Schema({
    _id: mongoose.Schema.ObjectId
    ,name: {
        require:true,
        type:String
    }
    ,coordList:[{
        x: Number,
        y: Number
    }],
        avgPoint:{
            x:Number,
            y:Number
        },
        point1:{
            x:Number,
            y:Number
        },
        point2:{
            x:Number,
            y:Number
        }
});
let Player = mongoose.model('PlayerData',playerSchema);
Player.find().limit(1).exec(function(err, dbUsers) {
    // Only insert into DB if there are no users yet
    if (! dbUsers.length) {
        var users = require('./players.json').map(function(user) {
            return new Player(user);
        });
        Player.insertMany(users, function(err) {
            if (err) {
                console.log('Error populating data in MongoDB', err);
            } else {
                console.log('MongoDB initialized successfully.');
            }
        });
    }
});

function findAvgPoint(PlayerName) {
    let avgX = 0;
    let avgY = 0;
    Player.findOne({name: PlayerName}).exec((err,results)=>{
            if (err)
                console.log(err);
            else{
               results.coordList.forEach((element)=>
                {
                    avgX+=element.x;
                    avgY+=element.y;
                });
                avgX/=results.coordList.length;
                avgY/=results.coordList.length;
               results.avgPoint = {
                   x:avgX,
                   y:avgY
               }
               return results.save()
            }
        })
}
//Helper functions
function findRadius(playerName){
    Player.findOne({name: playerName}).exec((results)=>{
        let radius = Math.sqrt(Math.pow(results.avgPoint.x,2)+Math.pow(results.avgPoint.y,2))
        return radius
    })
}
module.exports = {Player,
findAvgPoint};