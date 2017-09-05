import React, { Component } from "react";
import Search from "./Search";
import SearchResult from "./SearchResult";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class SearchContainer extends Component {
	static PropTypes = {
		onFavoriteChange: PropTypes.func.isRequired,
		onQuerySubmit: PropTypes.func.isRequired
	};

	onFavoriteChange = gem => {
		this.props.onFavoriteChange(gem);
	};

	onQuerySubmit = query => {
		this.props.onQuerySubmit(query);
	};

	render() {
		let { gems, favorites } = this.props;
		let searchResults = gems.map(gem => {
			return (
				<SearchResult
					key={gem.name}
					handleFavoriteChange={this.onFavoriteChange}
					gem={gem}
					favorites={favorites}
				/>
			);
		});
		return (
			<div>
				<nav className="navbar navbar-inverse">
					<div className="container">
						<div className="navbar-header">
							<span className="navbar-brand">Project name</span>
						</div>
						<div id="navbar" className="collapse navbar-collapse">
							<ul className="nav navbar-nav">
								<li key="favorite">
									<Link to="/favorites" className="active">
										Favorites
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-6 center-block">
							<Search onQuerySubmit={this.onQuerySubmit} />
						</div>
					</div>
					<div className="row">
						{gems.length ? (
							<div className="col-lg-6 center-block">
								<h2>Search Results</h2>
								{searchResults.length ? (
									<ol>{searchResults}</ol>
								) : (
									<h3>No gems available</h3>
								)}
							</div>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default SearchContainer;
