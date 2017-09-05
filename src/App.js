import React, { Component } from "react";
import Header from "./Header";
import Search from "./Search";
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
      console.log("remove " + favorites);
      this.removeFromFavorites(gem);
    } else {
      console.log("add " + favorites);
      this.saveToFavorites(gem);
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
              <ol>
                {this.state.gems.map(gem => {
                  return (
                    <li>
                      <div className="gem panel panel-default">
                        <div className="panel-heading">
                          <h3>
                            <a href={gem.homepage_uri} data-id={gem.name}>
                              {gem.name}
                            </a>
                            <button
                              type="button"
                              className="btn btn-default"
                              aria-label="Left Align"
                              onClick={event => {
                                event.preventDefault();
                                this.handleFavorites(
                                  event.currentTarget.previousSibling.dataset.id
                                );
                              }}
                            >
                              <i
                                className={
                                  this.state.favorites.includes(gem.name) ? (
                                    "fa fa-heart"
                                  ) : (
                                    "fa fa-heart-o"
                                  )
                                }
                                aria-hidden="true"
                              />
                            </button>
                          </h3>
                        </div>
                        <div className="panel-body">
                          <p className="description">{gem.info}</p>
                          {gem.dependencies.development.length ? (
                            <div className="dependencies">
                              <h4>
                                Development Dependencies ({gem.dependencies.development.length})
                              </h4>
                              <ul className="list-group">
                                {gem.dependencies.development.map(dev => {
                                  return (
                                    <li className="list-group-item">
                                      <a
                                        href={
                                          "https://rubygems.org/gems/" +
                                          dev.name
                                        }
                                        target="_blank"
                                      >
                                        {dev.name}
                                      </a>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
