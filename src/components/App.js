import React, { Component } from 'react';
import './App.css';
import MovieList from './MovieList';
import { requestMovies } from '../api/movieDb';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
			year: new Date().getFullYear(),
			// year: 2018, // alternate year for testing
			minPopularity: 10
    };
  }

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
    console.log('sorted movies', sortedMovies);
    console.log('a movie', sortedMovies[45]);

		this.setState({ movies: sortedMovies });
	}

  render() {
    return (
      <div className="App">
        <h1>TIFF {this.state.year}</h1>
        <h2>Popular Movies Around  the World</h2>
        <MovieList movies={this.state.movies} />
      </div>
    );
  }
}

export default App;
