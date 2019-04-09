import React, { Component } from 'react';
import './App.css';
import MovieList from './MovieList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear()
    };
  }

  render() {
    return (
      <div className="App">
        <h1>TIFF Top Movies of { this.state.year }</h1>
        <MovieList />
      </div>
    );
  }
}

export default App;
