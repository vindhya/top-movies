import React, { Component } from 'react';
import { requestMovieDetail } from '../api/movieDb';
import CastList from './CastList';

class MovieDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.match.params.id,
			movieDetail: {},
			isLoading: true
		};
	}

	componentDidMount = async () => {
		const movieDetail = await requestMovieDetail(this.state.id);
		this.setState({
			movieDetail: movieDetail.data,
			isLoading: false
		});
	}

	render() {
		const { title, poster_path, tagline, overview, genres } = this.state.movieDetail;

		if (this.state.isLoading) {
			return <p>Loading...</p>;
		} else {
			return (
				<div>
					<h2>{title}</h2>

					<div className='row'>
						<div className='col-lg-4'>
							<img
								className='img-fluid'
								alt={`Movie poster for ${title}`}
								src={`https://image.tmdb.org/t/p/w342${poster_path}`}
							/>
						</div>

						<div className='col-lg-8'>
							<h3>{tagline}</h3>
							<p>{overview}</p>
							<span>Genres:</span>
							<ul>
								{genres.map(genre => (
									<li key={genre.id}>{genre.name}</li>
								))}
							</ul>
							<CastList movieId={this.state.id} />
						</div>
					</div>

				</div>
			);
		}
	}
}

export default MovieDetail;