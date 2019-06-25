import React from 'react';

class Character extends React.Component {
    constructor(props){
        super()
        this.state = {
            character: props.character
        }
    }

    render(){

        if(this.props.character === null) return(
            <div className="column">
                <div className="loadingVerticalAlign">
                    <h1>Loading...</h1>
                </div>
            </div>
        )

        var imgStyle = {
            width: "35%"
        }

        if(this.props.character.index){
            var imgElement = React.createElement(
                "img",
                {   // Attributes
                    src: require("../characters/"+ this.props.character.index + ".jpg"),
                    style: imgStyle
                }
            )
        }        

        var weightText = ""

        if(this.props.character.mass === "unknown"){
            weightText = "Unknown"
        }else{
            weightText = this.props.character.mass + "kg"
        }

        var ageText = ""

        if(this.props.character.birth_year === "unknown"){
            ageText = "N/A"
        }else{
            ageText = this.props.character.birth_year
        }
        
        return(
            <div className="column">
                <div>
                    <table className="CharacterTable" cellSpacing="10">
                        <tbody>
                            <tr>
                                <td>{imgElement}</td>
                            </tr>
                            <tr>
                                <td>{this.props.character.name}</td>
                            </tr>
                            <tr>
                                <td>{this.props.character.species}</td>
                            </tr>
                            <tr>
                                <td>{this.props.character.gender}</td>
                            </tr>
                            <tr>
                                <td>{ageText}</td>
                            </tr>
                            <tr>
                                <td>{this.props.character.hair_color}</td>
                            </tr>
                            <tr>
                                <td>{weightText}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Character