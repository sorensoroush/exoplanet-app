import React, { Component } from 'react'

let ctx2

class PlanetStats extends Component {
  drawPlanets() {
    const plMass = this.props.randPlanet.pl_bmassj
    const plRad = this.props.randPlanet.pl_radj
    const earthMass = (1/317.83)
    const earthRad = (1/11.209)
 
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
    ctx2.fillText(this.props.randPlanet.pl_name, 195, 50)
 
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

  componentDidMount() {
    ctx2 = document.getElementById('sizes').getContext('2d')
    this.drawPlanets()
  } 

  componentDidUpdate() {
    ctx2.clearRect(0, 0, 300, 300)
    this.drawPlanets()
  }

  render() {
    return (
      <div id="planets-container">
       <div id="planets-title">
         <h2>{this.props.randPlanet.pl_name}'s size and mass</h2>
       </div>
       <div id="planets-canvas">
         <canvas id="sizes" width="300" height="300"></canvas>
       </div>
     </div>
    )
  }
}

export default PlanetStats
