import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://api.themoviedb.org/3'
});

const instanceBasicParam = apiPath => {
	return instance.get(apiPath, {
		params: {
			api_key: process.env.REACT_APP_MOVIEDB_API_KEY
		}
	});
};

export const requestMovies = (currentYear, pageNum) => {
	const apiPath = '/discover/movie';

	return instance.get(apiPath, {
		params: {
			api_key: process.env.REACT_APP_MOVIEDB_API_KEY,
			page: pageNum,
			sort_by: 'popularity.desc',
			primary_release_year: currentYear
		}
	});
}

export const requestMovieDetail = movieId => {
	return instanceBasicParam(`/movie/${movieId}`);
}

export const requestCastList = movieId => {
	return instanceBasicParam(`/movie/${movieId}/credits`);
}

export const requestPersonDetails = personId => {
	return instanceBasicParam(`/person/${personId}`);
}

export const requestPersonMovieCredits = personId => {
	return instanceBasicParam(`/person/${personId}/movie_credits`);
}

export default instance;