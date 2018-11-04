import React, { Component } from "react";
import "./Canvas.css";

class Canvas extends Component {

    constructor () {
        super()
        this.myCanvas = React.createRef();
    }

    handleClick = (evt) => {
        console.log("Canvas clicked");
        let coords = this.getMousePos(evt)
        coords.x = coords.x / 400
        coords.y = (400 - coords.y) / 400
        //TODO make this do stuff with DB
        //console.log(this.props);
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
            ctx.fillRect(element.x * 400, (1 - element.y) * 400,6,6);
        })
    }

    reDrawWithData = () => {
        console.log('actually redrawing with data');
        console.log(this.props.currentVersion)
        const ctx = this.refs.myCanvas.getContext("2d");
        const ctx2 = this.refs.myCanvas.getContext("2d");
        ctx.clearRect(0, 0, this.refs.myCanvas.width, this.refs.myCanvas.height);

        //console.log(this.props.coordList)
        this.props.coordList.forEach((element)=>{
            //console.log(element.x)
            //console.log(element.y)
            ctx.fillStyle="#FF0000";
            ctx.fillRect(element.x * 400, (1 - element.y) * 400,6,6);
        })

        setTimeout(() => {
            console.log('trying to add data')
            ctx2.fillStyle="#0000FF";

            ctx2.fillRect(this.props.currentVersion.avgPoint.x * 400,
                (1 - this.props.currentVersion.avgPoint.y) * 400,
                6,6);
            ctx2.fillRect(this.props.currentVersion.point1.x * 400,
                (1 - this.props.currentVersion.point1.y) * 400,
                6,6);
            ctx2.fillRect(this.props.currentVersion.point2.x * 400,
                (1 - this.props.currentVersion.point2.y) * 400,
                6,6);
            ctx2.beginPath();
            ctx2.arc(this.props.currentVersion.avgPoint.x * 400,
                (1 - this.props.currentVersion.avgPoint.y) * 400,
                this.props.currentVersion.radius * 400,
                0,
                2*Math.PI)
            ctx2.arc(0 * 400,
                (1 ) * 400,
                Math.sqrt(
                    Math.pow(this.props.currentVersion.avgPoint.x, 2) +
                    Math.pow(this.props.currentVersion.avgPoint.y, 2)
                ) * 400,
                0,
                2 *Math.PI)
            ctx2.stroke();
        }, 500)


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
                        width="400"
                        height="400"
                    />

                    <canvas
                        ref="myCanvas"
                        className="gameCanvas"
                        width="400"
                        height="400"
                        onClick={this.handleClick}
                    />
                </div>
            </div>
        );
    }
}

export default Canvas;
