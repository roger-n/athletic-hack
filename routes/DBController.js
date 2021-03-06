const mongoose = require('mongoose');
const math = require('mathjs');
const playerSchema= mongoose.Schema({
    name: {
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
        },
    stdDeviation:Number
});
let Player = mongoose.model('PlayerData',playerSchema,'playerdatas');



function updateData(id) {
    Player.findById(id.toString()).exec((err,results)=>{
        console.log('these are the results');
        console.log(results);


        let callback = (newResultsCoords) => {
            results.avgPoint = getAvgPoint(newResultsCoords);
            console.log("RESULTS AVGPOINT SHOULD BE:",results.avgPoint);
            let length = 2 * getStandardDev(newResultsCoords);
            console.log("STANDARD DEVIATION SHOULD BE", length / 2)
            let radius = findRadius(results.avgPoint);
            let a = getA(radius, length);
            let b = getB(radius, a);
            results.point1 = getPoint1(a, results.avgPoint.x, radius, b, results.avgPoint.y);
            results.point2 = getPoint2(a, results.avgPoint.x, radius, b, results.avgPoint.y);
            results.stdDeviation = length;
            return results.save()
        }

        let resultsLeft = results.coordList.length;

        let newResultsCoords = [];
        results.coordList.forEach(result => {
            console.log('checking' + result.x + ', ' + result.y);
            if ((Math.sqrt(Math.pow(result.x - .28, 2) + Math.pow(result.y - .28, 2)))
                > 0.4){
                console.log('passed')
                newResultsCoords.push(result)
            }
            resultsLeft--;
            console.log(resultsLeft);
            if(resultsLeft === 0) {
                callback(newResultsCoords);
            }
        })



    })/*.catch((err)=>{console.log(err)})*/
    /*.exec((err,results) => {
        if(err)
            return null;
        else {
            results.avgPoint = getAvgPoint(results.coordList);
            let length = getStandardDev(results.coordList);
            let radius = findRadius(results.avgPoint);
            let a = getA(radius, length);
            let b = getB(radius, a);
            results.point1 = getPoint1(a, results.avgPoint.x, radius, b, results.avgPoint.y);
            results.point2 = getPoint2(a, results.avgPoint.x, radius, b, results.avgPoint.y);
            return results.save()
        }*/

    }




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
                console.log("Average Coords",avgX,avgY);
                return {"x":avgX,"y":avgY}

}
//Helper functions
function findRadius(coords){
    return Math.sqrt(Math.pow(coords.x,2)+Math.pow(coords.y,2))
}

function getStandardDev(coordsList){
    console.log('standard dev coords: ' + coordsList + ' end')
    //console.log
    return math.std(coordsList.map(element=> (element.x)
    ),coordsList.map(element=>(element.y)))
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

    return {"x":x,"y":y}
}

function getPoint2(a,c,r,b,d){
    let x =(a*(c/r)+(b*(d/r)));
    let y = ((a*(d/r))-(b*(c/r)));

    return {"x":x,"y":y}
}
function makeId()
{
    return mongoose.Types.ObjectId.toString()
}
module.exports = {Player, updateData,makeId};