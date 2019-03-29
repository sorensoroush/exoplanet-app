import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'

import Loading from './components/Loading'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Home from './components/Home'
import About from './components/About'
import PlanetList from './components/PlanetList'
import RandomPlanet from './components/RandomPlanet'

class App extends Component {
  state = {
    planetData: [],
    isLoaded: false
  } 

  componentDidMount() {
    fetch('https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&format=JSON&api_key=Kdd4hQF33ZIk6rnDWkIDJY1PxdlnhAQ5lfgQifVX')
      .then(response => response.json())
      .then(data => this.setState({planetData: data}))
      .then(() => {
        this.setState({isLoaded: true})
        console.log(this.state.planetData)
      })
  }

  render() {
    return (
     <div>
     {this.state.isLoaded ? (
      <div className="App">
        <Header />
        <NavBar />
        <main>
          <Route exact path="/" component={Home}/>
          <Route path="/planet-list" render={() => <PlanetList planetData={this.state.planetData} />}/>
          <Route path="/random-planet" render={() => <RandomPlanet planetData={this.state.planetData} />}/>
          <Route path="/about" component={About}/>
        </main>
      </div>
     ) : <Loading />
    }
    </div>
   )
  }
}

export default App;
