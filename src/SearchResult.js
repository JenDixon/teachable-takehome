import React, { Component } from "react";

class SearchResult extends Component {
	handleFavoriteChange = gem => {
		this.props.handleFavoriteChange(gem);
	};

	render() {
		const { gem, favorites } = this.props;

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
								onClick={event => {
									event.preventDefault();
									this.handleFavoriteChange(
										event.currentTarget.previousSibling
											.dataset.id
									);
								}}
							>
								<i
									className={
										favorites.includes(gem.name) ? (
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
	}
}

export default SearchResult;
