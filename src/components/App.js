import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import MovieList from './MovieList';
import { requestMovies } from '../api/movieDb';
import MovieDetail from './MovieDetail';
import PersonDetail from './PersonDetail';

class App extends Component {
	state = {
		movies: [],
		year: new Date().getFullYear(),
		// year: 2018, // alternate year for testing
		minPopularity: 10,
		isLoading: true
	};

  getPromises = totalPages => {
		let promises = [];

		for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
			promises.push(requestMovies(this.state.year, pageNum));
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
				const page = await requestMovies(this.state.year, pageNum);
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
		// this compare function is used to sort the movies by release date
		const compare = (a, b) => {
			let comparison = 0;
			if (a.release_date > b.release_date) {
				comparison = 1;
			} else if (a.release_date < b.release_date) {
				comparison = -1;
			}
			return comparison;
		};

		const movies = await this.getMovies();
		const sortedMovies = [...movies].sort(compare);

		this.setState({
			movies: sortedMovies,
			isLoading: false
		});
	}

  render() {
		if (this.state.isLoading) {
			return <div className='container'>Loading...</div>;
		} else {
			return (
				<div className='App container'>
				<h1>TIFF Movies</h1>
					<BrowserRouter>
						<div>
							<Route exact path='/' component={() => <MovieList movies={this.state.movies} year={this.state.year} />} />
							<Route path='/movie/:id' component={MovieDetail} />
							<Route path='/person/:id' component={PersonDetail} />
						</div>
					</BrowserRouter>
				</div>
			);
		}
  }
}

export default App;
