import React, { Component } from 'react';
import { requestPersonDetails, requestPersonMovieCredits } from '../api/movieDb';
import { Link } from 'react-router-dom';

class PersonDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.match.params.id,
			person: {},
			movieCredits: [],
			isLoading: true
		}
	}

	componentDidMount = async () => {
		const person = requestPersonDetails(this.state.id);
		const movieCredits = requestPersonMovieCredits(this.state.id);
		const response = await Promise.all([person, movieCredits]);
		
		this.setState({
			person: response[0].data,
			movieCredits: response[1].data.cast,
			isLoading: false
		});
	}

	render() {
		if (this.state.isLoading) {
			return <div>Loading...</div>;
		} else {
			const { name, profile_path, biography } = this.state.person;
			const movieCredits = this.state.movieCredits;
			
			console.log('person', this.state.person);
			console.log('movie credits', this.state.movieCredits);

			return (
				<div>
					<h2>{name}</h2>
					{profile_path
						? <img alt={`${name} profile`} src={`https://image.tmdb.org/t/p/w185${profile_path}`} />
						: <span>No profile image</span>}
					<p>{biography}</p>
					Movie Credits:
					<ul>
						{movieCredits.map(movie => (
							<li key={movie.id}>
								<Link to={`/movie/${movie.id}`}>{movie.original_title}</Link>
							</li>
						))}
					</ul>
				</div>
			);
		}
	}
}

export default PersonDetail;