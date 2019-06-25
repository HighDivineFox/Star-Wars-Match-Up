import React from 'react';
import '../App.css';
import Character from './Character';

class Content extends React.Component{
    constructor(props){
        super()
    }
    
    render() {
        return(
            <div id="Container">
                <Character character={this.props.leftChar}/>
                <div className="column middle">
                    <div>
                        <table id="stats"  cellSpacing="10">
                            <tbody>
                                <tr>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                </tr>
                                <tr>
                                    <td>Species</td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                </tr>
                                <tr>
                                    <td>Birth Year</td>
                                </tr>
                                <tr>
                                    <td>Hair</td>
                                </tr>
                                <tr>
                                    <td>Weight</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <Character character={this.props.rightChar}/>
            </div>
        )
    }    
}

export default Content