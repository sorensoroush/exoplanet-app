import React, { Component } from 'react'

let canvas, ctx, plEccen, plMaxOrb, randPlanet
const earthEccen = 0.0167
  
class RandomPlanet extends Component {
  drawOrbits() {
    plEccen = randPlanet.pl_orbeccen
    plMaxOrb = randPlanet.pl_orbsmax
    const plOrbRad = plMaxOrb * 145
    console.log(plEccen, plMaxOrb)
    canvas = document.getElementById('orbits')
    ctx = canvas.getContext('2d')
    ctx.lineWidth = 2
    ctx.strokeStyle = '#000000'
    ctx.strokeText('+', 147, 153)
    if (plMaxOrb) {
      ctx.beginPath()
      // if (plEccen !== null) {
        // const plFocusLen = plOrbRad * plEccen
        // const plMajAxis = plOrbRad - plFocusLen
        // ctx.ellipse(150 + plFocusLen, 150, 150 * plMajAxis, Math.pow(
      if (plMaxOrb < 1) {
        ctx.ellipse(150, 150, plOrbRad, plOrbRad, 0, 0, 2 * Math.PI)
      } else {
        ctx.ellipse(150, 150, 145, 145, 0, 0, 2 * Math.PI)
      }
      ctx.stroke()
    }
    ctx.beginPath()
    if (plMaxOrb < 1) {
      ctx.ellipse(150, 150, 145, 145, 0, 0, 2 * Math.PI)
    } else {
      ctx.ellipse(150, 150, (1/plMaxOrb) * 145, (1/plMaxOrb) * 145, 0, 0, 2 * Math.PI)
    }
    ctx.strokeStyle = '#0000FF'
    ctx.stroke()
  }
    
  componentDidMount() {
    this.drawOrbits()
  }

  componentDidUpdate() {
    ctx.clearRect(0, 0, 300, 300)
    this.drawOrbits()
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
            <p style={{color: 'blue'}}>Earth orbit</p>
            <p>{randPlanet.pl_name} orbit</p>
            {randPlanet.pl_orbeccen !== null ? <p>Eccentricity: {randPlanet.pl_orbeccen}</p> : null}
            {randPlanet.pl_orbsmax !== null ? <p>Max orbit radius: {randPlanet.pl_orbsmax} AU</p> : <p>Orbit information unknown</p>}
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
