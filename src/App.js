import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'

import Header from './components/Header'
import NavBar from './components/NavBar'
import Home from './components/Home'
import PlanetList from './components/PlanetList'
import RandomPlanet from './components/RandomPlanet'

// delete this import when ready to import from api
import planetData from './data/exoplanetData.json'

class App extends Component {
  state = {
    // switch lines when ready to import from api
    // planetData: []
    planetData
  } 

/* uncomment when ready to import from api

  componentDidMount() {
    fetch('https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&format=JSON&api_key=Kdd4hQF33ZIk6rnDWkIDJY1PxdlnhAQ5lfgQifVX')
      .then(response => response.json())
      .then(data => this.setState({planetData: data}))
      .then(() => console.log(this.state.planetData))
  }
*/

  render() {
    return (
      <div className="App">
        <Header />
        <NavBar />
        <main>
          <Route exact path="/" component={Home}/>
          <Route path="/planet-list" render={() => <PlanetList planetData={this.state.planetData} />}/>
          <Route path="/random-planet" render={() => <RandomPlanet planetData={this.state.planetData} />}/>
        </main>
      </div>
    );
  }
}

export default App;
