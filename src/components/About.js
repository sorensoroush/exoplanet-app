import React from 'react'

const About = props => {
  return (
    <div className="textbg home">
      <h1>About the exoplanet planetarium</h1>
      <p>This is a webpage that pulls from <a href="https://exoplanetarchive.ipac.caltech.edu">NASA's exoplanet archive</a>. From its API, one can fetch all sorts of information about the 3926 confirmed exoplanets.</p>
    </div>
  )
}

export default About
