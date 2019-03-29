import React, { Component }  from 'react' 
let ctx
const earthEccen = 0.0167

class OrbitStats extends Component {
  drawOrbits() {
    const plEccen = this.props.randPlanet.pl_orbeccen
    const plOrbAU = this.props.randPlanet.pl_orbsmax
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

  componentDidMount() {
    ctx = document.getElementById('orbits').getContext('2d')
    this.drawOrbits()
  }

  componentDidUpdate() {
    ctx.clearRect(0, 0, 400, 300)
    this.drawOrbits()
  }
 
  render() {
    const { randPlanet } = this.props
    return (
      <div id="orbits-container">
        <div id="orbits-title">
          <h2>{randPlanet.pl_name}'s orbit</h2>
        </div>
        <div id="orbits-canvas">
          <canvas id="orbits" width="400" height="300"></canvas>
        </div>
        <div id="orbits-info">
          {randPlanet.pl_orbsmax !== null ? 
            <div>
            <p style={{color: 'blue', textDecoration: 'underline'}}>Earth's orbit</p>
            <p style={{color: 'blue'}}>Eccentricity: {earthEccen}</p>
            <p style={{color: 'blue'}}>Average orbit radius: 1 AU</p>
            <p style={{color: 'blue'}}>Orbit period: 365 days</p>
            <br />
            <p style={{textDecoration: 'underline'}}>{randPlanet.pl_name}'s orbit</p>
            {randPlanet.pl_orbeccen !== null ? <p>Eccentricity: {randPlanet.pl_orbeccen}</p> : <p style={{color: 'gray'}}>Eccentricity unknown</p>}
            <p>Average orbit radius: {randPlanet.pl_orbsmax} AU</p>
            {randPlanet.pl_orbper !== null ? <p>Orbit period: {Math.round(randPlanet.pl_orbper)} days</p> : null}
            </div>
          : <p>Orbit information unknown</p>
          }
        </div>
      </div>
    )
  }
}

export default OrbitStats
