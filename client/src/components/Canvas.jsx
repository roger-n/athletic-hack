import React, { Component } from "react";
import "./Canvas.css";

const canvasSize = 500;

class Canvas extends Component {

    constructor () {
        super()
        this.myCanvas = React.createRef();
    }

    handleClick = (evt) => {
        console.log("Canvas clicked");
        let coords = this.getMousePos(evt)
        coords.x = coords.x / canvasSize
        coords.y = (canvasSize - coords.y) / canvasSize
        //TODO make this do stuff with DB
        //console.log(this.pros);

        this.props.coordList.push({x: coords.x, y: coords.y})
        //console.log(coords.x)
        //console.log(coords.y)
        this.reDraw();
    };

    reDraw = () => {
        console.log('actually redrawing');
        const ctx = this.refs.myCanvas.getContext("2d");
        ctx.clearRect(0, 0, this.refs.myCanvas.width, this.refs.myCanvas.height);

        //console.log(this.props.coordList)
        this.props.coordList.forEach((element)=>{
            //console.log(element.x)
            //console.log(element.y)
            ctx.fillStyle="#FF0000";
            ctx.fillRect(element.x * canvasSize, (1 - element.y) * canvasSize,6,6);
        })
    }

    pointIsInfield = (element, callback) => {
        //If element in coordList is under radius r, add it to infield
        if(
            (Math.sqrt(Math.pow(element.x - .28, 2) + Math.pow(element.y - .28, 2)))
            < 0.4){
            callback(true);
        }
    }

    reDrawWithData = () => {
        //Making array of infield points
        let infieldPoints = [];

        console.log('actually redrawing with data');
        console.log(this.props.currentVersion)
        const ctx = this.refs.myCanvas.getContext("2d");
        const ctx2 = this.refs.myCanvas.getContext("2d");
        const ctx3 = this.refs.myCanvas.getContext("2d");
        const ctx4 = this.refs.myCanvas.getContext("2d");
        ctx.clearRect(0, 0, this.refs.myCanvas.width, this.refs.myCanvas.height);

        //console.log(this.props.coordList)
        this.props.coordList.forEach((element)=>{

            //If element in coordList is under radius r, add it to infield
            this.pointIsInfield(element, (isInField) => {
                if (isInField) {
                    infieldPoints.push({x: element.x, y:element.y})
                }
            })


            //console.log(element.x)
            //console.log(element.y)
            ctx.fillStyle="#FF0000";
            ctx.fillRect(element.x * canvasSize, (1 - element.y) * canvasSize,6,6);
        })

        setTimeout(() => {
            console.log('trying to add data')
            ctx2.fillStyle="#0000FF";
            ctx2.strokeStyle="#008000";
            ctx2.lineWidth="8px"

            ctx2.fillRect(this.props.currentVersion.avgPoint.x * canvasSize,
                (1 - this.props.currentVersion.avgPoint.y) * canvasSize,
                10,10);
            ctx2.fillRect(this.props.currentVersion.point1.x * canvasSize,
                (1 - this.props.currentVersion.point1.y) * canvasSize,
                10,10);
            ctx2.fillRect(this.props.currentVersion.point2.x * canvasSize,
                (1 - this.props.currentVersion.point2.y) * canvasSize,
                10,10);

            setTimeout(() => {
                ctx3.strokeStyle="#FFFFFF";
                ctx3.globalAlpha = 0.7
                ctx3.lineWidth="8px"
                var grd=ctx.createRadialGradient(
                    this.props.currentVersion.avgPoint.x * canvasSize,
                    (1 - this.props.currentVersion.avgPoint.y) * canvasSize,
                    5,
                    this.props.currentVersion.avgPoint.x * canvasSize,
                    (1 - this.props.currentVersion.avgPoint.y) * canvasSize,
                    this.props.currentVersion.stdDeviation / 2 * canvasSize);
                grd.addColorStop(0,"red");
                grd.addColorStop(1,"white");
                ctx.fillStyle=grd;

                ctx3.beginPath();
                ctx3.arc(this.props.currentVersion.avgPoint.x * canvasSize,
                    (1 - this.props.currentVersion.avgPoint.y) * canvasSize,
                    this.props.currentVersion.stdDeviation / 2 * canvasSize,
                    0,
                    2*Math.PI);
                ctx3.stroke();
                ctx3.fill();
                setTimeout(() => {
                    ctx4.strokeStyle="#0FB8F9";
                    ctx4.lineWidth=4;
                    ctx4.beginPath();
                    ctx4.arc(0,
                        (1 ) * canvasSize,
                        Math.sqrt(
                            Math.pow(this.props.currentVersion.avgPoint.x, 2) +
                            Math.pow(this.props.currentVersion.avgPoint.y, 2)
                        ) * canvasSize,
                        -59/128 * Math.PI,
                        -3/64 * Math.PI)
                    ctx4.stroke();

                    //Add infield coords
                    setTimeout(() => {


                        console.log('starting paint of inner')
                        console.log(infieldPoints)
                        this.doAveragesOfInField(infieldPoints, this.doStuffWithAverages);
                    }, 100);
                }, 100);
            }, 100);
        }, 100);
    }

    doStuffWithAverages = (topCoords, bottomCoords) =>{
        console.log('made it to callback1')
        console.log(topCoords);
        console.log(bottomCoords);
        let avgX = 0;
        let avgY = 0;

        topCoords.forEach((element)=>
        {
            avgX+=element.x;
        });
        avgX/=topCoords.length;
        console.log("Average X Coord",avgX);

        bottomCoords.forEach((element)=>
        {
            avgY+=element.y;
        });
        avgY/=bottomCoords.length;

        console.log("Average Y Coord",avgY);

        const ctx5 = this.refs.myCanvas.getContext("2d");

        ctx5.fillStyle="#006400";
        ctx5.strokeStyle="#008000";
        ctx5.lineWidth="8px";

        ctx5.fillRect(avgX * canvasSize,
                0.47 * canvasSize,
                10,10);
        ctx5.fillRect(0.5 * canvasSize,
                (1- avgY) * canvasSize,
                10,10);

    }

    doAveragesOfInField = (coords, callback) => {

        console.log('taking averages')
        console.log(coords)
        console.log('end coords')
        let topCoords = [];
        let bottomCoords = [];

        let elementsLeft = coords.length;


        coords.forEach((element)=>
        {
            console.log(element)
            console.log(Math.atan(element.y/element.x))
            if (Math.atan(element.y/element.x) > Math.PI/4) {
                topCoords.push(element)
            } else {
                bottomCoords.push(element)
            }
            console.log('top and bottom coords')
            console.log(topCoords)
            console.log(bottomCoords)
            elementsLeft--;
            if(elementsLeft === 0) {
                callback(topCoords, bottomCoords)
            }
        });


    }


    getMousePos = (evt) => {
        let rect = this.refs.myCanvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    render() {
        console.log("rendering")
        return (
            <div>
                <div className="container">
                    <img
                        className="img"
                        src="https://i.imgur.com/Xxighhh.png"
                        alt=""
                        width={canvasSize}
                        height={canvasSize}
                    />

                    <canvas
                        ref="myCanvas"
                        className="gameCanvas"
                        width={canvasSize}
                        height={canvasSize}
                        onClick={this.handleClick}
                    />
                </div>
            </div>
        );
    }
}

export default Canvas;
