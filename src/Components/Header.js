import React from 'react';
import '../App.css';
import refresh_icon from "../Images/return.png";

class Header extends React.Component{

    render(){
        return(
            <div className="Header">
                <span className="title">Who...</span><br />
                <span className="scenario">
                    {this.props.scenario}
                    <img src={refresh_icon} alt="refresh scenario" onClick={this.props.refresh}/>
                </span>
            </div>
        )
    }
    
}

export default Header