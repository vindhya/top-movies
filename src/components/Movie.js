import React from 'react';

function Movie ({ detail }) {
	if (detail.poster_path) {
		return (
			<div>
				<img
					alt={`Movie poster for ${detail.title}`}
					src={`https://image.tmdb.org/t/p/w185${detail.poster_path}`}
				/>
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

export default Movie;