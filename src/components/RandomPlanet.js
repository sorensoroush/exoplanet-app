import React, { Component } from 'react'

let canvas, ctx, plEccen, plOrbAU, randPlanet
const earthEccen = 0.0167
  
class RandomPlanet extends Component {
  drawOrbits() {
    plEccen = randPlanet.pl_orbeccen
    plOrbAU = randPlanet.pl_orbsmax
    const plMajRad = plOrbAU * 145
    console.log(plEccen, plOrbAU)
    ctx.lineWidth = 2
    ctx.strokeStyle = '#000000'
    ctx.strokeText('+', 147, 153)

    ctx.beginPath()
    if (plEccen !== null) {
      const plFocusLen = plMajRad * plEccen
      const plMinRad = Math.sqrt(Math.pow(plMajRad,2) - Math.pow(plFocusLen,2))
      if (plOrbAU < 1) {
        ctx.ellipse(150 + plFocusLen, 150, plMajRad, plMinRad, 0, 0, 2 * Math.PI)
      } else {
        ctx.ellipse(150 + plFocusLen / plOrbAU, 150, 145, 145 * (plMinRad/plMajRad), 0, 0, 2 * Math.PI)
      }
      ctx.stroke()
    } else {
      if (plOrbAU < 1) {
        ctx.ellipse(150, 150, plMajRad, plMajRad, 0, 0, 2 * Math.PI)
      } else {
        ctx.ellipse(150, 150, 145, 145, 0, 0, 2 * Math.PI)
      }
      ctx.stroke()
    }

    ctx.beginPath()
    if (plOrbAU < 1) {
      ctx.ellipse(150, 150, 145, 145, 0, 0, 2 * Math.PI)
    } else {
      ctx.ellipse(150, 150, (1/plOrbAU) * 145, (1/plOrbAU) * 145, 0, 0, 2 * Math.PI)
    }
    ctx.strokeStyle = '#0000FF'
    ctx.stroke()
  }
    
  componentDidMount() {
    canvas = document.getElementById('orbits')
    ctx = canvas.getContext('2d')
    if (randPlanet.pl_orbsmax) {this.drawOrbits()}
  }

  componentDidUpdate() {
    ctx.clearRect(0, 0, 300, 300)
    if (randPlanet.pl_orbsmax) {
      this.drawOrbits()
    }
  }
   
  render () {
    const planetPropertyList = []
    randPlanet = this.props.planetData[Math.floor( Math.random() * this.props.planetData.length)]
    for (let key in randPlanet) {
      if (randPlanet[key] !== null) {
        planetPropertyList.push(<li key={key}>{key}: {randPlanet[key]}</li>)
      }
    }
  
    console.log(randPlanet)
  
    return (
      <div>
        <h1>{randPlanet.pl_name}</h1>
        <div id="container">
          <div id="orbits-canvas">
            <canvas id="orbits" width="300" height="300"></canvas>
          </div>
          <div id="orbits-info">
            {randPlanet.pl_orbsmax !== null ? 
              <div>
              <p style={{color: 'blue', textDecoration: 'underline'}}>Earth's orbit</p>
              <p style={{color: 'blue'}}>Eccentricity: {earthEccen}</p>
              <p style={{color: 'blue'}}>Semimajor axis radius: 1 AU</p>
              <p style={{color: 'blue'}}>Orbit period: 365 days</p>
              <br />
              <p style={{textDecoration: 'underline'}}>{randPlanet.pl_name}'s orbit</p>
              {randPlanet.pl_orbeccen !== null ? <p>Eccentricity: {randPlanet.pl_orbeccen}</p> : null}
              <p>Semimajor axis radius: {randPlanet.pl_orbsmax} AU</p>
              {randPlanet.pl_orbper !== null ? <p>Orbit period: {Math.round(randPlanet.pl_orbper)} days</p> : null}
              </div>
            : 
              randPlanet.pl_orbeccen !== null ?
                <p>Database error: {randPlanet.pl_name}'s orbit eccentricity is {randPlanet.pl_orbeccen}, yet semimajor axis radius is not listed. Find it {'here'}.</p>
              : 
                <p>Orbit information unknown</p>
              }
          </div>
          <div id="planets-canvas">
            <canvas id="sizes" width="300" height="300"></canvas>
          </div>
        </div>
        <ul>
          {planetPropertyList.length > 0 && planetPropertyList}
      </ul>
      </div>
    )
  }
}


export default RandomPlanet
