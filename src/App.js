import React, { Component } from "react";
import Header from "./Header";
import Search from "./Search";
import SearchResults from "./SearchResults";
import * as GemApi from "./GemApi";

class App extends Component {
  state = {
    gems: [],
    favorites: []
  };

  submitQuery = query => {
    GemApi.search(query).then(gems => {
      this.setState({ gems });
      console.log(gems);
    });
  };

  loadFavorites = gems => {
    let allFavorites = window.localStorage.getItem("favorites");
    allFavorites
      ? (allFavorites = JSON.parse(allFavorites))
      : (allFavorites = []);
    this.setState({ favorites: allFavorites });
    return allFavorites;
  };

  saveToFavorites = gem => {
    let favorites = [...this.state.favorites];
    favorites.push(gem);
    console.log(favorites);
    this.setState({
      favorites
    });
    window.localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  removeFromFavorites = gem => {
    let favorites = [...this.state.favorites];
    if (favorites.includes(gem)) {
      let index = favorites.indexOf(gem);
      favorites.splice(index, 1);
    }

    if (favorites) {
      window.localStorage.clear();
      window.localStorage.setItem("favorites", JSON.stringify(favorites));

      this.setState({
        favorites
      });
    }
  };

  handleFavorites = gem => {
    console.log(gem);
    let favorites = this.loadFavorites();
    if (favorites && favorites.includes(gem)) {
      this.removeFromFavorites(gem);
      console.log("remove " + favorites);
    } else {
      this.saveToFavorites(gem);
      console.log("add " + favorites);
    }
  };

  render() {
    return (
      <div className="app">
        <nav className="navbar navbar-inverse">
          <div className="container">
            <div className="navbar-header">
              <span className="navbar-brand">Project name</span>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li className="active">
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 center-block">
              <Search onQuerySubmit={this.submitQuery} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 center-block">
              {this.state.gems.length ? <h2>Search Results</h2> : ""}
              <SearchResults
                onFavoriteChange={this.handleFavorites}
                gems={this.state.gems}
                favorites={this.state.favorites}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
