import React, { Component } from 'react'

let ctx3
const parsecToLY = 3.26156

class StarStats extends Component {
  drawStars() {
    const { randPlanet } = this.props
    const stDist = randPlanet.st_dist * parsecToLY
    const stTemp = randPlanet.st_teff
    const stMass = randPlanet.st_mass
    const stRad = randPlanet.st_rad
    let stLum = randPlanet.gaia_gmag
    if (stLum === null) stLum = randPlanet.st_optmag

    const sunTemp = 5778
    const sunLum = 4.83
    const relLum = Math.pow(100, (stLum - sunLum) / 5)
    
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
    ctx3.fillText(randPlanet.pl_hostname, 195, 20)

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
      ctx3.fillText('Temperature not available', 155, 240)
      ctx3.fillStyle = 'black'
    }

    if (stLum !== null) {
      relLum > 1 ? ctx3.fillText(`${relLum.toFixed()}x brighter`, 40, 260) : ctx3.fillText(`${(1/relLum).toFixed()}x brighter`, 185, 260)
    } else {
      ctx3.fillStyle = 'gray'
      ctx3.fillText('Brightness not available', 165, 260)
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

  componentDidMount() {
    ctx3 = document.getElementById('stars').getContext('2d')
    this.drawStars()
  }

  componentDidUpdate() {
    ctx3.clearRect(0, 0, 300, 300)
    this.drawStars()
  }
 
  render() {
    return (
      <div id="stars-container">
        <div id="stars-title">
          <h2>{this.props.randPlanet.pl_name}'s star's statistics</h2>
        </div>
        <div id="stars-canvas">
          <canvas id="stars" width="300" height="300"></canvas>
        </div>
      </div>
    )
  }
}

export default StarStats
