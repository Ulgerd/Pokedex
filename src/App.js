import React, { Component } from 'react';
import './App.css';

const API = 'https://pokeapi.co/api/v2/pokemon/?limit=783'

class Pokemons extends Component {

  sortByName = (arr) => {
    arr.sort((a,b)=> {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    })
  }

  render() {
    let {poks} = this.props;
    let pokemonsArr = Object.keys(poks).map(key =>
      poks[key])
    this.sortByName(pokemonsArr);
    return(
      <div>
        {pokemonsArr.map(key=>
          <span key = {key.name}>
            <img src = {`${key.img}`} alt={key.name} />
            {key.name}
          </span>)}
      </div>
    )
  }
}

class App extends Component {

  state = {
    pokemons: {},
    pokemonsCurr: {},
    pokemonsAll: {},
    input: "",
    error: null
  }

  async componentDidMount() {
    try {
      let res = await fetch(API);
      let pokemons = await res.json();
      this.setState({
        pokemons: pokemons.results,
        input: 'Pi'
      })
      this.update();
    } catch (e) {
      this.setState({
        error: e
      })
    }
  }

  getImgLinks = (chosen) => {

    try {
      Promise.all(
        chosen.map(key =>
          fetch(key.url)
          .then(res => res.json())
          .then(res => {
             return {
               name: this.firstCapital(res.name),
               img: res.sprites.front_default
             }
          })
        )
      ).then(sprites => {
        this.setState({
          pokemonsCurr: [...sprites]
        })
      })
    } catch(e) {
      this.setState({
        error: e
      })
    }
  }

  firstCapital = (name) => {
    return name.slice(0,1).toUpperCase() + name.slice(1,);
  }

  onNewInput = async(e) => {
    await this.setState({
      input: e.target.value
    })
    await this.update();
  }

  update = () => {
    let {pokemons, input} = this.state;
    let pokemonsChosen = [];
    Object.keys(pokemons).map(key => {
      if (this.firstCapital(pokemons[key].name).search([input])>-1) {
        pokemonsChosen.push(pokemons[key])
      }
      return null;
    })
    this.getImgLinks(pokemonsChosen);
  }

  render() {
    return (
      <div className="App">
        Name:
        <input
          type="text"
          name="pokeSearch"
          value= {this.state.input}
          onChange={this.onNewInput}
        />
        <Pokemons poks = {this.state.pokemonsCurr} />
      </div>
    );
  }
}

export default App;
