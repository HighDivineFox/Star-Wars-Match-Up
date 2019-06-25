import React from 'react';
import arrowLeft from "../Images/arrowLeft.png";
import arrowLeft_Hover from "../Images/arrowLeft_Hover.png";
import arrowLeft_Pressed from "../Images/arrowLeft_Pressed.png";
import arrowRight from "../Images/arrowRight.png";
import arrowRight_Hover from "../Images/arrowRight_Hover.png";
import arrowRight_Pressed from "../Images/arrowRight_Pressed.png";


class CharacterChoice extends React.Component {
    constructor(props){
        super()
        this.state = {
            leftArrowSrc: arrowLeft,
            rightArrowSrc: arrowRight
        }

        this.handleOver = this.handleOver.bind(this)
        this.handleOut = this.handleOut.bind(this)
        this.handlePress = this.handlePress.bind(this)
        this.handleUp = this.handleUp.bind(this)
    }

    render() {

        if(this.props.charsLeft === 0){
            return (
                <div id="CharacterSelection">
                    <img id="left" src={this.state.leftArrowSrc} alt="Left Arrow" onClick={this.props.onClickRight} onMouseOver={this.handleOver} onMouseOut={this.handleOut} onMouseDown={this.handlePress} onMouseUp={this.handleUp}/>
                    <h1 className="declareWinner">Declare a Winner!</h1>
                    <img id="right" src={this.state.rightArrowSrc} alt="Right Arrow" onClick={this.props.onClickLeft} onMouseOver={this.handleOver} onMouseOut={this.handleOut} onMouseDown={this.handlePress} onMouseUp={this.handleUp}/>
                </div>
            );
        }else{
            return (
                <div id="CharacterSelection">
                    <img id="left" src={this.state.leftArrowSrc} alt="Left Arrow" onClick={this.props.onClickRight} onMouseOver={this.handleOver} onMouseOut={this.handleOut} onMouseDown={this.handlePress} onMouseUp={this.handleUp}/>
                    <img id="right" src={this.state.rightArrowSrc} alt="Right Arrow" onClick={this.props.onClickLeft} onMouseOver={this.handleOver} onMouseOut={this.handleOut} onMouseDown={this.handlePress} onMouseUp={this.handleUp}/>
                </div>
            );
        }

        
    }

    handleOver(e){
        if(e.currentTarget.id === "left"){
            this.setState({
                leftArrowSrc: arrowLeft_Hover
            })
        }else if(e.currentTarget.id === "right"){
            this.setState({
                rightArrowSrc: arrowRight_Hover
            })
        }
    }

    handleOut(e){
        if(e.currentTarget.id === "left"){
            this.setState({
                leftArrowSrc: arrowLeft
            })
        }else if(e.currentTarget.id === "right"){
            this.setState({
                rightArrowSrc: arrowRight
            })
        }
    }

    handlePress(e){
        if(e.currentTarget.id === "left"){
            this.setState({
                leftArrowSrc: arrowLeft_Pressed
            })
        }else if(e.currentTarget.id === "right"){
            this.setState({
                rightArrowSrc: arrowRight_Pressed
            })
        }
    }

    handleUp(e){
        if(e.currentTarget.id === "left"){
            this.setState({
                leftArrowSrc: arrowLeft_Hover
            })
        }else if(e.currentTarget.id === "right"){
            this.setState({
                rightArrowSrc: arrowRight_Hover
            })
        }
    }
}

export default CharacterChoice;