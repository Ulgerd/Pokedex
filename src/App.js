import React, { Component } from 'react';
import PokeCard from "./components/pokeCard";
import Pagination from "./components/pagination";
import './App.css';

const API = 'https://pokeapi.co/api/v2/pokemon/?limit=783'

class App extends Component {

  state = {
    pokemons: {},
    pokemonsCurr: {},
    input: "",
    error: null,
    currentPage: 1,
    pageLimit: 12
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
        input: 'P',
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
      input: e.target.value,
      currentPage: 1
    })
    await this.update();
  }

  update = () => {
    let {pokemons, input} = this.state;
    let pokemonsChosen = [];
    Object.keys(pokemons).map(key => {
      if (this.firstCapital(pokemons[key].name).search([input])>-1) {
        pokemons[key].name = this.firstCapital(pokemons[key].name);
        pokemonsChosen.push(pokemons[key])
      }
      return null;
    })
    this.setState({
      pokemonsCurr: {...pokemonsChosen}
    })
  }

  sortByName = (arr) => {
    arr.sort((a,b)=> {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    })
  }

  onClick = (e) => {
    this.setState({
      currentPage: e.target.innerText
    })
  }

  render() {
    let pokemonsArr = Object.keys(this.state.pokemonsCurr).map(key =>
      this.state.pokemonsCurr[key])
    this.sortByName(pokemonsArr);

    let {currentPage, pageLimit} = this.state

    let indexOfLastPokemon = currentPage * pageLimit;
    let indexOfFirstPokemon = indexOfLastPokemon - pageLimit;
    let currentPokemons = pokemonsArr.slice(indexOfFirstPokemon, indexOfLastPokemon);

    return (
      <div className="container">
        Name:
        <input
          type="text"
          name="pokeSearch"
          value= {this.state.input}
          onChange={this.onNewInput}
        />
        <div
          className="container">
          <div
            className="row d-flex flex-row py-5">
            <div
              className="px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                {currentPokemons.map(key=>
                  <PokeCard
                    name={key.name}
                    imgLink={this.state.imgLink}
                    id={key.url.match(/\/\d{1,}/)[0]}
                  />)
                }
            </div>

            <div
              class="forPagination">
                <Pagination
                  totalPokemons={pokemonsArr.length}
                  pageLimit={this.state.pageLimit}
                  onClick={this.onClick}
                  currentPage = {this.state.currentPage}
                />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
