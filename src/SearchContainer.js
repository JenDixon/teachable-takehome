import React, { Component } from "react";
import Search from "./Search";
import SearchResult from "./SearchResult";
import { Link } from "react-router-dom";

class SearchContainer extends Component {
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
								<li>
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
								<ol>{searchResults}</ol>
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
