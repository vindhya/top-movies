import React, { Component } from 'react';

class MovieList extends Component {
	state = {
			movies: [],
			year: new Date().getFullYear(),
			minPopularity: 10
	};

	getPromises = (year) => {
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

	componentDidMount = async () => {
		const promises = await this.getPromises(this.state.year);
		// const promises = this.getPromises(this.state.year);

		// fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&primary_release_year=${this.state.year}&page=1&api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`)
		// // fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&page=1`)
		// 	.then(res => res.json())
		// 	.then(data => console.log(data));

		console.log('BP 1', promises, typeof promises, typeof promises[0]);
		Promise.all(promises)
			.then(res => {
				console.log(res.body);
				return res.json();
			}).then(values => {
				console.log(values);
			});
			// .then((res) => {
			// 	console.log('BP 2', res);
			// 	return res.map(page => {
			// 		console.log('BP 3', page, typeof page);
			// 		return page.json();
			// 	})
			// }).then(pages => {
			// 	console.log('BP 4', pages, typeof pages);
			// 	return pages.forEach(page => {
			// 		console.log('BP 5', page, typeof page)
			// 		return page.then(p => console.log('BP 6', p, typeof p));
			// })});

	// 	promises.forEach(promise => {
	// 		promise
	// 			.then(res => res.json())
	// 			.then(data => console.log(data));
	// 	});
	}

	render() {
		return <p>This is a movie list!</p>;
	}
}

export default MovieList;