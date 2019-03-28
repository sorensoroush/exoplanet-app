import React, { Component } from 'react'
import { Link, Router } from 'react-router-dom'

let ctx, ctx2, ctx3
const earthEccen = 0.0167
const parsecToLY = 3.26156

class RandomPlanet extends Component {
  state = {
    randPlanet: this.props.planetData[Math.floor( Math.random() * this.props.planetData.length)]
  }

  drawOrbits() {
    const plEccen = this.state.randPlanet.pl_orbeccen
    const plOrbAU = this.state.randPlanet.pl_orbsmax
    const plMajRad = plOrbAU * 145
    ctx.lineWidth = 2
    ctx.strokeStyle = '#000000'

    if (plOrbAU) {
      ctx.font = 'bold 11px serif'
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
      ctx.stroke() } else {
      ctx.beginPath() 
      ctx.strokeStyle = 'gray'
      ctx.setLineDash([5,5])
      ctx.arc(150, 150, 100, 0, 2 * Math.PI)
      ctx.setLineDash([])
      ctx.stroke()
      ctx.font = 'normal 72px serif'
      ctx.fillText('?', 135, 165)
    }
  }
  
  drawPlanets() {
    const plMass = this.state.randPlanet.pl_bmassj
    const plRad = this.state.randPlanet.pl_radj
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
    ctx2.fillText(this.state.randPlanet.pl_name, 195, 50)

    ctx2.fillStyle = 'black'
    ctx2.font = '14px serif'
    if (plRad !== null) {
      plRad < 1 ? ctx2.fillText(`${(1/plRad).toPrecision(3)}x larger`, 40, 240) : ctx2.fillText(`${plRad.toPrecision(3)}x larger`, 185, 240)
    } else {
      ctx2.fillStyle = 'gray'
      ctx2.fillText('Radius not available', 165, 240)
      ctx2.fillStyle = 'black'
    }

    if (plMass !== null) {
      plMass < 1 ? ctx2.fillText(`${(1/plMass).toPrecision(3)}x more massive`, 20, 260) : ctx2.fillText(`${plMass.toPrecision(3)}x more massive`, 165, 260)
    } else {
      ctx2.fillStyle = 'gray'
      ctx2.fillText('Mass not available', 165, 260)
    }
  }

  drawStars() {
    const stDist = this.state.randPlanet.st_dist * 3.26156
    const stTemp = this.state.randPlanet.st_teff
    const stMass = this.state.randPlanet.st_mass
    const stRad = this.state.randPlanet.st_rad
    let stLum = this.state.randPlanet.gaia_gmag
    if (stLum === null) stLum = this.state.randPlanet.st_optmag

    const sunTemp = 5778
    const sunLum = 4.83
    const relLum = Math.pow(100, (stLum - sunLum) / 5)
    
    // Temp variables
    const plMass = this.state.randPlanet.pl_bmassj
    const plRad = this.state.randPlanet.pl_radj

    ctx3.beginPath()
    if (stRad < 1) {
      ctx3.arc(75, 100, 70, 0, 2 * Math.PI)
    } else {
      ctx3.arc(75, 100, 70 / stRad, 0, 2 * Math.PI)
    }
    ctx3.fillStyle = 'gold'
    ctx3.fill()

    
    ctx3.font = '16px serif'
    ctx3.fillStyle = 'orange'
    ctx3.fillText('The Sun', 50, 20)

    ctx3.beginPath()
    if (stRad < 1 && stRad !== null) {
      ctx3.arc(225, 100, 70 * stRad, 0, 2 * Math.PI)
    } else {
      ctx3.arc(225, 100, 70, 0, 2 * Math.PI)
    }

    if (stRad !== null) {
      ctx3.fill()
    } else {
      ctx3.strokeStyle = 'orange'
      ctx3.stroke()
      ctx3.font = '72px serif'
      ctx3.fillText('?', 210, 120)
    }

    ctx3.font = '16px serif'
    ctx3.fillStyle = 'darkorange'
    ctx3.fillText(this.state.randPlanet.pl_hostname, 195, 20)

    ctx3.fillStyle = 'black'
    ctx3.font = '14px serif'

    if (stRad !== null) {
      stRad < 1 ? ctx3.fillText(`${(1/stRad).toPrecision(3)}x larger`, 40, 200) : ctx3.fillText(`${stRad.toPrecision(3)}x larger`, 185, 200)
    } else {
      ctx3.fillStyle = 'gray'
      ctx3.fillText('Radius not available', 185, 200)
      ctx3.fillStyle = 'black'
    }

    if (stMass !== null) {
      stMass < 1 ? ctx3.fillText(`${(1/stMass).toPrecision(3)}x more massive`, 40, 220) : ctx3.fillText(`${stMass.toPrecision(3)}x more massive`, 185, 220)
    } else {
      ctx3.fillStyle = 'gray'
      ctx3.fillText('Mass not available', 185, 220)
      ctx3.fillStyle = 'black'
    }

    if (stTemp !== null) {
      stTemp < sunTemp ? ctx3.fillText(`${(sunTemp/stTemp).toPrecision(3)}x hotter`, 40, 240) : ctx3.fillText(`${(stTemp/sunTemp).toPrecision(3)}x hotter`, 185, 240)
    } else {
      ctx3.fillStyle = 'gray'
      ctx3.fillText('Temperature not available', 185, 240)
      ctx3.fillStyle = 'black'
    }

    if (stLum !== null) {
      relLum > 1 ? ctx3.fillText(`${relLum.toFixed()}x brighter`, 40, 260) : ctx3.fillText(`${(1/relLum).toFixed()}x brighter`, 185, 260)
    } else {
      ctx3.fillStyle = 'gray'
      ctx3.fillText('Brightness not available', 185, 260)
      ctx3.fillStyle = 'black'
    }

    ctx3.font = '16px serif'
    if (stDist !== null) {
      ctx3.fillText(`${stDist.toPrecision(4)} light years apart`, 92, 285)
    } else {
      ctx3.fillStyle = 'gray'
      ctx3.fillText('Distance not available', 165, 285)
      ctx3.fillStyle = 'black'
    }

  }
 
  randomizePlanet = () => {
    const randPl = this.props.planetData[Math.floor( Math.random() * this.props.planetData.length)]
    this.setState({randPlanet: randPl})
  }
    
  componentDidMount() {
    ctx = document.getElementById('orbits').getContext('2d')
    ctx2 = document.getElementById('sizes').getContext('2d')
    ctx3 = document.getElementById('stars').getContext('2d')
    this.drawOrbits()
    this.drawPlanets()
    this.drawStars()
  }

  componentDidUpdate() {
    ctx.clearRect(0, 0, 400, 300)
    ctx2.clearRect(0, 0, 300, 300)
    ctx3.clearRect(0, 0, 300, 300)
    this.drawOrbits()
    this.drawPlanets()
    this.drawStars()
  }
   
  render () {
 /* const planetPropertyList = []
    for (let key in this.state.randPlanet) {
      if (this.state.randPlanet[key] !== null) {
        planetPropertyList.push(<li key={key}>{key}: {this.state.randPlanet[key]}</li>)
      }
    }
 */  
    return (
      <div id="random-pl-page">
        <button onClick={this.randomizePlanet}>Randomize planet!</button>
        <h1>{this.state.randPlanet.pl_name}</h1>
        <div id="container">
          <div id="orbits-title">
            <h2>{this.state.randPlanet.pl_name}'s orbit</h2>
          </div>
          <div id="orbits-canvas">
            <canvas id="orbits" width="400" height="300"></canvas>
          </div>
          <div id="orbits-info">
            {this.state.randPlanet.pl_orbsmax !== null ? 
              <div>
              <p style={{color: 'blue', textDecoration: 'underline'}}>Earth's orbit</p>
              <p style={{color: 'blue'}}>Eccentricity: {earthEccen}</p>
              <p style={{color: 'blue'}}>Semimajor axis radius: 1 AU</p>
              <p style={{color: 'blue'}}>Orbit period: 365 days</p>
              <br />
              <p style={{textDecoration: 'underline'}}>{this.state.randPlanet.pl_name}'s orbit</p>
              {this.state.randPlanet.pl_orbeccen !== null ? <p>Eccentricity: {this.state.randPlanet.pl_orbeccen}</p> : <p style={{color: 'gray'}}>Eccentricity unknown</p>}
              <p>Semimajor axis radius: {this.state.randPlanet.pl_orbsmax} AU</p>
              {this.state.randPlanet.pl_orbper !== null ? <p>Orbit period: {Math.round(this.state.randPlanet.pl_orbper)} days</p> : null}
              </div>
            : <p>Orbit information unknown</p>
              /* this.state.randPlanet.pl_orbeccen !== null ?
                <p>Database error: {this.state.randPlanet.pl_name}'s orbit eccentricity is {this.state.randPlanet.pl_orbeccen}, yet semimajor axis radius is not listed. <a href={`http://exoplanet.eu/catalog/${this.state.randPlanet.pl_name.toLowerCase().replace(/ /g, "_")}`}>Find it here.</a></p>
              : 
                <p>Orbit information unknown</p>
            */  }
          </div>
          <div id="planets-title">
            <h2>{this.state.randPlanet.pl_name}'s size and mass</h2>
          </div>
          <div id="planets-canvas">
            <canvas id="sizes" width="300" height="300"></canvas>
          </div>
          <div id="stars-title">
            <h2>{this.state.randPlanet.pl_name}'s star's statistics</h2>
          </div>
          <div id="stars-canvas">
            <canvas id="stars" width="300" height="300"></canvas>
          </div>
        </div>
    {/* <ul>
          {planetPropertyList.length > 0 && planetPropertyList}
        </ul> */}
      </div>
    )
  }
}


export default RandomPlanet
