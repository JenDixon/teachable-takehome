import React, { Component } from "react";
import SearchResult from "./SearchResult";

class SearchResults extends Component {
	handleFavoriteChange = gem => {
		this.props.onFavoriteChange(gem);
	};

	render() {
		const gems = this.props.gems;
		const favorites = this.props.favorites;
		let searchResults = gems.map(gem => {
			return (
				<SearchResult
					handleFavoriteChange={this.handleFavoriteChange}
					gem={gem}
					favorites={favorites}
				/>
			);
		});

		return <ol>{searchResults}</ol>;
	}
}

export default SearchResults;
