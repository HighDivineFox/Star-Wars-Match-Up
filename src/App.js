import React from 'react';
import './App.css';
import Header from './Components/Header';
import Content from './Components/Content';
import Character from './Components/Character';
import CharacterChoice from './Components/CharacterChoice';
import Canvas from './Components/Background';
import jsonScenarios from "./scenarios.js";
import numberOfCharacters from "./GlobalSettings";

/*
  App feature.
    Ability to seelct which character wins in a certain scenario.
*/

// TODO: Keep track of selected Id's so we don't reroll them.
//        Reroll scenario
//        See stats for all scenarios

class App extends React.Component {
  constructor(){
    super()

    var arr = []

    for(var i = 1; i <= numberOfCharacters; i++){
      if(i === 17) continue
      arr.push(i)
    }

    this.state = {
      scenario: "",
      leftChar: null,
      rightChar: null,
      availableIndexes: arr,
      winner: null
    }

    //-- FUNCTIONS BOUND TO THIS COMPONENT
    this.newLeftChar = this.newLeftChar.bind(this)
    this.newRightChar = this.newRightChar.bind(this)
    this.resetIndexesandScenario = this.resetIndexesandScenario.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  render() {

    if(this.state.winner !== null){
      return (
        <div id="winnerBox">
          <Canvas />
          <div id="Container">
          <span className="title">Winner!</span><br />
            <Character character={this.state.winner} /><br />
            <span className="scenario">{this.state.scenario.winnerText}</span>
          </div>
        </div>
      )
    }else{
      return (
        <div onKeyPress={this.handleKeyPress}>
          <Canvas />
          <Header scenario={this.state.scenario.question} refresh={this.resetIndexesandScenario}/>
          <Content leftChar={this.state.leftChar} rightChar = {this.state.rightChar}/>
          <CharacterChoice onClickLeft={this.newLeftChar} onClickRight={this.newRightChar} charsLeft={this.state.availableIndexes.length}/>
        </div>
      )
    }
  }

  componentDidMount(){
    this.resetIndexesandScenario()
    this.newLeftChar()
    this.newRightChar()

    document.addEventListener("keydown", this.handleKeyPress, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  handleKeyPress(event){
    if(event.keyCode === 37){ // Left Key
      this.newRightChar();
    }else if(event.keyCode === 39){ // Right Key
      this.newLeftChar();
    }
  }

  validationFailed(index){
      if(index === 17){
        //console.log("17 selected. Invalid choice. Picking again.")
        return true;
      }

      if(this.state.availableIndexes.indexOf(index) === -1){
        //console.log("Index already picked")
        return true
      }

      if(this.state.leftChar === null || this.state.rightChar === null){
        //console.log("A character is null")
        return false
      }else if(index === this.state.leftChar.index || index === this.state.rightChar.index){
        //console.log("Same characters selected")
        return true;
      }     

    return false
  }

  resetIndexesandScenario(){
    var arr = this.getAvailableIndexes()

    if(this.state.leftChar !== null) arr = arr.filter(item => item !== this.state.leftChar.index)
    if(this.state.rightChar !== null) arr = arr.filter(item => item !== this.state.rightChar.index)

    this.setState({
      scenario: this.getScenario(),
      availableIndexes: arr
    })
  }

  getAvailableIndexes(){
    var arr = []

    for(var i = 1; i <= numberOfCharacters; i++){
      if(i === 17) continue
      arr.push(i)
    }

    return arr
  }

  getScenario(){
    return jsonScenarios.scenarios[Math.floor(Math.random() * jsonScenarios.scenarios.length)]
  }

  newChar(direction){
    if(this.state.leftChar !== null && direction.toLowerCase() === "left"){
      this.setState({
        leftChar: null
      })
    }

    if(this.state.leftChar !== null && direction.toLowerCase() === "right"){
      this.setState({
        rightChar: null
      })
    }

    var charIndex1 = this.state.availableIndexes[this.getNewCharacterIndex()]

    var count = 0

    while (this.validationFailed(charIndex1)){
      charIndex1 = this.state.availableIndexes[this.getNewCharacterIndex()]
      count++;

      if(count >= 150){
        //("Too many attempts to get a new character")
        return
      }
    }

    var indexToRemove = this.state.availableIndexes.indexOf(charIndex1)

    var arr = this.state.availableIndexes
    arr.splice(indexToRemove, 1)

    var charURL1 = "https://swapi.co/api/people/" + charIndex1
    var char = null;

    fetch(charURL1)
      .then(function(response) {
        if(response.ok){
          //console.log("Successful API call")
          return response
        }else{
          //console.log("Unsuccessful APIcall")
        }
      })
      .then(response => response.json())

      .then(character => {
        if(character.species.length === 0){
          // Don't try to fetch species if there is no species
          char = this.getCharacterObject(character, {name: "Unknown"}, charIndex1)


          if(direction.toLowerCase() === "left"){
            this.setState({
              leftChar: char,
              availableIndexes: arr
            })
          }else if(direction.toLowerCase() === "right"){
            this.setState({
              rightChar: char,
              availableIndexes: arr
            })
          }
          
        }else{
          fetch(character.species)
            .then(response => response.json())

            .then(species => {
              char = this.getCharacterObject(character, species, charIndex1)
            })

            .then(data => {
              if(direction.toLowerCase() === "left"){
                this.setState({
                  leftChar: char,
                  availableIndexes: arr
                })
              }else if(direction.toLowerCase() === "right"){
                this.setState({
                  rightChar: char,
                  availableIndexes: arr
                })
              }
            })
        }
      })
  }

  newLeftChar(){
    if(this.state.availableIndexes.length > 0){
      this.newChar("left")
    }else{
      this.setState(prevState => {
        return{
          winner: prevState.rightChar
        }
      })
    }
  }

  newRightChar(){
    if(this.state.availableIndexes.length > 0){
      this.newChar("right")
    }else{
      this.setState(prevState => {
        return{
          winner: prevState.leftChar
        }
      })
    }
  }

  getCharacterObject(character, species, index){
    return {
        index: index,
        name: character.name,
        species: species.name,
        gender: character.gender,
        birth_year: character.birth_year,
        hair_color: character.hair_color,
        mass: character.mass
    }
  }

  getNewCharacterIndex(){
    var rand = Math.floor(Math.random() * this.state.availableIndexes.length)    
    //console.log("index: " + rand)

    return rand
  }
}

export default App;
