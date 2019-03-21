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
            <img
              src = {`${this.props.imgLink}${key.url.match(/\/\d{1,}/)[0]}.png`}
              alt={key.name} />
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
    input: "",
    error: null
  }

  async componentDidMount() {
    try {
      let res = await fetch(API);
      let pokemonsAll = await res.json();
      let res2 = await fetch(pokemonsAll.results[0].url)
      let pokemonData = await res2.json();
      let imgLink = pokemonData.sprites.front_default.replace(/\/\d{1,}.png/gi, "");
      this.setState({
        pokemons: pokemonsAll.results,
        input: 'Pi',
        imgLink: imgLink
      })
      this.update();
    } catch (e) {
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
    this.setState({
      pokemonsCurr: {...pokemonsChosen}
    })
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
        <Pokemons
          poks = {this.state.pokemonsCurr}
          imgLink={this.state.imgLink}
        />
      </div>
    );
  }
}

export default App;
