import React, { Component } from "react";
import Header from "./Header";
import Search from "./Search";
import * as GemApi from "./GemApi";

class App extends Component {
  state = {
    query: "",
    gems: []
  };

  updateQuery = query => {
    this.setState({ query });
  };

  submitQuery = query => {
    GemApi.search(query).then(gems => {
      console.log(gems);
    });
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
              <div className="content">
                <h1>Find Ruby Gems</h1>
                <div className="input-group input-group-lg">
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.query}
                    placeholder="Search for..."
                    onChange={event => {
                      this.updateQuery(event.target.value);
                    }}
                  />
                  <span className="input-group-btn">
                    <button
                      className="btn btn-default"
                      type="button"
                      onClick={() => {
                        this.submitQuery(this.state.query);
                      }}
                    >
                      Go!
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
