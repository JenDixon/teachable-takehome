import React, { Component } from "react";
import { Route } from "react-router-dom";
import SearchContainer from "./SearchContainer";
import FavoritesContainer from "./FavoritesContainer";
import * as GemApi from "./GemApi";

class App extends Component {
  state = {
    gems: [],
    favorites: []
  };

  submitQuery = query => {
    GemApi.search(query).then(gems => {
      this.setState({ gems });
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
    let favorites = this.loadFavorites();
    if (favorites && favorites.includes(gem)) {
      this.removeFromFavorites(gem);
    } else {
      this.saveToFavorites(gem);
    }
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <SearchContainer
              {...this.state}
              onFavoriteChange={this.handleFavorites}
              onQuerySubmit={this.submitQuery}
            />
          )}
        />
        <Route
          path="/favorites"
          render={() => (
            <FavoritesContainer
              {...this.state}
              onFavoriteChange={this.handleFavorites}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
