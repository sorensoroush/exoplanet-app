import React, { Component } from 'react'

let ctx, ctx2, plEccen, plOrbAU, randPlanet
const earthEccen = 0.0167
const parsecToLY = 3.26156
  
class RandomPlanet extends Component {
  drawOrbits() {
    plEccen = randPlanet.pl_orbeccen
    plOrbAU = randPlanet.pl_orbsmax
    const plMajRad = plOrbAU * 145
    ctx.lineWidth = 2
    ctx.strokeStyle = '#000000'
    ctx.fillText('+', 147, 153)

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

  drawPlanets() {
    const plMass = randPlanet.pl_bmassj
    const plRad = randPlanet.pl_radj
    const earthMass = (1/317.83)
    const earthRad = (1/11.209)

    console.log('Mass: ' + plMass)
    console.log('Radius: ' + plRad)

    ctx2.beginPath()
    if (plRad < 1) {
      ctx2.arc(75, 150, 70, 0, 2 * Math.PI)
    } else {
      ctx2.arc(75, 150, 70 / plRad, 0, 2 * Math.PI)
    }
    ctx2.fillStyle = 'brown'
    ctx2.fill()

    ctx2.font = '16px serif'
    ctx2.fillText('Jupiter', 55, 50)

    ctx2.beginPath()
    if (plRad < 1 && plRad !== null) {
      ctx2.arc(225, 150, 70 * plRad, 0, 2 * Math.PI)
    } else {
      ctx2.arc(225, 150, 70, 0, 2 * Math.PI)
    }
    ctx2.fillStyle = 'gray'
    if (plRad !== null) {
      ctx2.fill()
    } else {
      ctx2.strokeStyle = 'gray'
      ctx2.stroke()
      ctx2.font = '72px serif'
      ctx2.fillText('?', 210, 170)
    }

    ctx2.font = '16px serif'
    ctx2.fillText(randPlanet.pl_name, 195, 50)

    ctx2.fillStyle = 'black'
    ctx2.font = '14px serif'
    if (plRad !== null) {
      plRad < 1 ? ctx2.fillText(`${(1/plRad).toFixed(2)}x larger`, 40, 240) : ctx2.fillText(`${plRad.toFixed(2)}x larger`, 185, 240)
    } else {
      ctx2.fillStyle = 'gray'
      ctx2.fillText('Radius not available', 165, 240)
      ctx2.fillStyle = 'black'
    }

    if (plMass !== null) {
      plMass < 1 ? ctx2.fillText(`${(1/plMass).toFixed(2)}x more massive`, 20, 260) : ctx2.fillText(`${plMass.toFixed(2)}x more massive`, 165, 260)
    } else {
      ctx2.fillStyle = 'gray'
      ctx2.fillText('Mass not available', 165, 260)
    }
  }
    
  componentDidMount() {
    ctx = document.getElementById('orbits').getContext('2d')
    ctx2 = document.getElementById('sizes').getContext('2d')
    if (randPlanet.pl_orbsmax) {this.drawOrbits()}
    this.drawPlanets()
  }

  componentDidUpdate() {
    ctx.clearRect(0, 0, 300, 300)
    ctx2.clearRect(0, 0, 300, 300)
    if (randPlanet.pl_orbsmax) {
      this.drawOrbits()
    }
    this.drawPlanets()
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
          <div id="star-info">
            {randPlanet.st_dist !== null && <p>Dist to system: {(randPlanet.st_dist * parsecToLY).toFixed(2)} light years</p>}
            {randPlanet.st_teff !== null && <p>Temperature of system star: {randPlanet.st_teff} K</p>}
            {randPlanet.st_mass !== null && <p>Mass of system star: {randPlanet.st_mass} Suns</p>}
            {randPlanet.st_rad !== null && <p>Radius of system star: {randPlanet.st_rad} Suns</p>}
            {randPlanet.gaia_gmag ? <p>Absolute magnitiude of system star brightness: {randPlanet.gaia_gmag.toFixed(2)}</p> : randPlanet.st_optmag ? <p>Absolute magnitiude of system star brightness: {randPlanet.st_optmag}</p> : null}
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
