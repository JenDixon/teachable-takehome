import React, { Component } from "react";
import * as GemApi from "./GemApi";

class Search extends Component {
  state = {
    query: ""
  };

  updateQuery = query => {
    this.setState({ query });
  };

  handleQuerySubmit = query => {
    this.props.onQuerySubmit(query);
  };

  render() {
    return (
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
                this.handleQuerySubmit(this.state.query);
              }}
            >
              Go!
            </button>
          </span>
        </div>
      </div>
    );
  }
}

export default Search;
