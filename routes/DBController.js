const mongoose = require('mongoose');
const math = require('mathjs');
const playerSchema= mongoose.Schema({
    _id: mongoose.Schema.ObjectId
    ,name: {
        required:true,
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
let Player = mongoose.model('PlayerData',playerSchema,'playerdatas');



function updateData(id) {
    Player.findOne({_id: id}).exec((results) => {
        results.avgPoint = getAvgPoint(results.coordList);
        let length = getStandardDev(results.coordList);
        let radius = findRadius(results.avgPoint);
        let a = getA(radius,length);
        let b = getB(radius,a);

        results.point1=getPoint1(a,results.avgPoint.x,radius,b,results.avgPoint.y);
        results.point2=getPoint2(a,results.avgPoint.x,radius,b,results.avgPoint.y);
        return results.save()

    })
}

/*Player.find().limit(1).exec(function(err, dbUsers) {
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
});*/

function getAvgPoint(coords) {
    let avgX = 0;
    let avgY = 0;
               coords.forEach((element)=>
                {
                    avgX+=element.x;
                    avgY+=element.y;
                });
                avgX/=coords.length;
                avgY/=coords.length;
                return {avgX,avgY}

}
//Helper functions
function findRadius(coords){
    return Math.sqrt(Math.pow(coords.x,2)+Math.power(coords.y,2))
}

function getStandardDev(coordsList){
    return math.std(coordsList.x,coordsList.y);
}

function getA(radius, length){
    let a = (2*Math.pow(radius,2)-Math.pow(length,2))/(2*radius)
    return a
}
function getB(radius,a)
{
    return Math.sqrt(Math.pow(radius,2)-Math.pow(a,2))
}

function getPoint1(a,c,r,b,d){
    let x =(a*(c/r)-(b*(d/r)));
    let y = ((a*(d/r))+(b*(c/r)));

    return {x,y}
}

function getPoint2(a,c,r,b,d){
    let x =(a*(c/r)+(b*(d/r)));
    let y = ((a*(d/r))-(b*(c/r)));

    return {x,y}
}
function makeId()
{
    return mongoose.Types.ObjectId;
}
module.exports = {Player, updateData,makeId};