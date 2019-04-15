import React from 'react';
import MovieCard from './MovieCard';
import './MovieList.css';

function MovieList (props) {
	return (
		<div>
			<h2>Popular Movies Around the World</h2>
			<p>Click on a movie poster to see the movie's details.</p>
			<ul className="movie-list">
				{props.movies.map(movie => (
					<li key={movie.id}><MovieCard detail={movie} /></li>
				))}
			</ul>
		</div>
	);
}

export default MovieList;