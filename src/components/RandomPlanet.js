import React, { Component } from 'react'

import OrbitStats from './stat-components/OrbitStats.js'
import PlanetStats from './stat-components/PlanetStats.js'
import StarStats from './stat-components/StarStats.js'

class RandomPlanet extends Component {
  state = {
    randPlanet: this.props.planetData[Math.floor( Math.random() * this.props.planetData.length)],
  }
 
  randomizePlanet = () => {
    const randPl = this.props.planetData[Math.floor( Math.random() * this.props.planetData.length)]
    this.setState({randPlanet: randPl})
  }
  
  render () {
   return (
      <div id="random-pl-page">
        <div className="textbg">
          <button onClick={this.randomizePlanet}>Randomize planet!</button>
        </div>
        <h1>{this.state.randPlanet.pl_name}</h1>
        <div id="container">
          <OrbitStats randPlanet={this.state.randPlanet} />
          <PlanetStats randPlanet={this.state.randPlanet} />
          <StarStats randPlanet={this.state.randPlanet} />
        </div>
      </div>
    )
  }
}


export default RandomPlanet
