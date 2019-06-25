import React from 'react'
import "../App.css"

class Canvas extends React.Component {
    constructor(){
        super()
        this.state = {
            stars: this.getStarArray()
        }
    }
    
    render(){
        return(
            <div>
                <canvas ref="canvas" id="canvas"></canvas>
            </div>
        )
    }

    componentDidMount(){
        this.updateDimensions()

        window.addEventListener("resize", this.updateDimensions.bind(this))
    }

    updateDimensions(){
        //console.log("updating")
        const canvas = this.refs.canvas

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        this.updateCanvas()
    }

    updateCanvas(){
        const ctx = this.refs.canvas.getContext("2d")
    
        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

        this.setState({
            stars: this.getStarArray()
        })

        ctx.fillStyle = "#FFF"
        for(var i = 0; i < this.state.stars.length; i++){
            ctx.beginPath()
            ctx.arc(this.state.stars[i].x, this.state.stars[i].y, Math.floor(Math.random() * 3), 0, Math.PI * 2, false)
            ctx.fill()
        }
    }

    getStarArray(){
        var arr = []

        for(var i = 0; i < 1000; i++){
            arr.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
            })
        }

        return arr
    }
}

export default Canvas