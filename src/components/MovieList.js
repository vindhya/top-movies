import React, { Component } from 'react';

class MovieList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: [],
			year: new Date().getFullYear(),
			minPopularity: 10
		};
	}

	getPromises(year) {
		const baseUrl = 'https://api.themoviedb.org/3/discover/movie';
		const queries = `?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&sort_by=popularity.desc&primary_release_year=${year}`;
		let promises = [];

		if (year === 2019) {
			for (let pageNum = 1; pageNum <= 8; pageNum++) {
				// console.log(baseUrl + queries + '&page=' + pageNum);
				promises.push(fetch(baseUrl + queries + '&page=' + pageNum));
			}
		}

		return promises;
	}

	componentDidMount() {
		// const promises = await this.getPromises(this.state.year);
		const promises = this.getPromises(this.state.year);

		// fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&primary_release_year=${this.state.year}&page=1&api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`)
		// // fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&page=1`)
		// 	.then(res => res.json())
		// 	.then(data => console.log(data));

		Promise.all(promises)
			.then(res => res.map(page => page.json()))
			.then(pages => {
				const data = pages.flat();
				console.log(data);
				console.log(Promise.resolve(data));
			});
	}

	render() {
		return <p>This is a movie list!</p>;
	}
}

export default MovieList;