import React, { Component } from "react";
import SearchResult from "./SearchResult";
import { Link } from "react-router-dom";

class FavoritesContainer extends Component {
	handleFavoriteChange = gem => {
		this.props.onFavoriteChange(gem);
	};

	render() {
		let { gems, favorites } = this.props;
		let favoriteResultObjects = gems.filter(gem => {
			if (favorites.includes(gem.name)) {
				return gem;
			}
		});

		let favoriteResults = favoriteResultObjects.map(gem => {
			return (
				<SearchResult
					key={gem.name}
					handleFavoriteChange={this.handleFavoriteChange}
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
								<li key="search">
									<Link to="/" className="active">
										Search
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-6 center-block">
							<h2>Favorites</h2>
							{favoriteResults.length ? (
								<ol>{favoriteResults}</ol>
							) : (
								<h3>No favorites available</h3>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FavoritesContainer;
