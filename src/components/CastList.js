import React, { Component } from 'react';
import { requestCastList } from '../api/movieDb';
import { Link } from 'react-router-dom';

class CastList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			movieId: props.movieId,
			cast: []
		};
	}

	componentDidMount = async () => {
		const castList = await requestCastList(this.state.movieId);
		
		this.setState({
			cast: castList.data.cast,
			isLoading: false
		})
	}

	render() {
		if (this.state.isLoading) {
			return <div>Loading...</div>
		} else {
			return (
				<div>
					Cast:
					<ul>
						{this.state.cast.map(castMember => (
							<li key={castMember.cast_id}><Link to={`/person/${castMember.id}`}>{castMember.name}</Link></li>
						))}
					</ul>
				</div>
			);
		}
	}
}

export default CastList;