import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard ({ detail }) {
	if (detail.poster_path) {
		return (
			<div>
				<Link to={`/movie/${detail.id}`}>
					<img
						alt={`Movie poster for ${detail.title}`}
						src={`https://image.tmdb.org/t/p/w185${detail.poster_path}`}
					/>
				</Link>
			</div>
		);
	} else {
		console.log('no image', detail);
		return (
			<div>
				<h3>{detail.title}</h3>
			</div>
		);
	}
	
}

export default MovieCard;