import React, { Component } from 'react';
import axios from 'axios';

class MovieList extends Component {
	state = {
			movies: [],
			year: new Date().getFullYear(),
			// year: 2018,
			minPopularity: 10
	};

	callMovieDb = pageNum => {
		const baseApiUrl = 'https://api.themoviedb.org/3/discover/movie';

		return axios.get(baseApiUrl, {
			params: {
				api_key: process.env.REACT_APP_MOVIEDB_API_KEY,
				page: pageNum,
				sort_by: 'popularity.desc',
				primary_release_year: this.state.year
			}
		});
	}

	getPromises = totalPages => {
		let promises = [];

		for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
			promises.push(this.callMovieDb(pageNum));
		}

		return promises;
	}

	getMovies = async () => {
		let pages = [];

		// if the year is 2019, already know it will take 8 calls to the API to get all the data back
		// this is done for page load speed so that the values of each page's promise do not have to be resolved
		// to check the popularity >= 10 before moving on to the next page's promise
		if (this.state.year === 2019) {
			const response = await Promise.all(this.getPromises(8));
			pages = response.map(page => page.data.results);

		// if the year is not 2019 (i.e., 2020+), we will have to resolve each page's promise to check that the
		// popularity is still above 10. presentation of movies will be slower than if the year is 2019
		} else {
			let pageNum = 1;
			let isPopular = true;

			while (isPopular) {
				const page = await this.callMovieDb(pageNum);
				const lowPopularity = page.data.results.filter(movie => movie.popularity < this.state.minPopularity);
				pages.push(page.data.results);

				// check for any movies with too low of a popularity. if they exist, break the while loop
				if (lowPopularity.length > 0) {
					isPopular = false;
				}

				pageNum++;
			}
		}

		return pages.flat().filter(movie => movie.popularity >= this.state.minPopularity);
	}

	componentDidMount = async () => {
		const movies = await this.getMovies();
		console.log('movies', movies);
	}

	render() {
		return <p>This is a movie list!</p>;
	}
}

export default MovieList;