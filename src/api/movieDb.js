import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://api.themoviedb.org/3'
});

export const requestMovies = (year, pageNum) => {
	const apiPath = '/discover/movie';

	return instance.get(apiPath, {
		params: {
			api_key: process.env.REACT_APP_MOVIEDB_API_KEY,
			page: pageNum,
			sort_by: 'popularity.desc',
			primary_release_year: year
		}
	});
}

export const requestMovieDetail = id => {
	const apiPath = `/movie/${id}`;

	return instance.get(apiPath, {
		params: {
			api_key: process.env.REACT_APP_MOVIEDB_API_KEY
		}
	});
}

export default instance;