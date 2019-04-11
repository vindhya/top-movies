import React from 'react';
import MovieCard from './MovieCard';
import './MovieList.css';

function MovieList (props) {
	return (
		<ul className="movie-list">
			{props.movies.map(movie => (
				<li key={movie.id}><MovieCard detail={movie} /></li>
			))}
		</ul>
	);
}

export default MovieList;