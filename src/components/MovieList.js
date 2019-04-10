import React from 'react';
import Movie from './Movie';
import './MovieList.css';

function MovieList (props) {
	return (
		<ul className="movie-list">
			{props.movies.map(movie => (
				<li key={movie.id}><Movie detail={movie} /></li>
			))}
		</ul>
	);
}

export default MovieList;