import React from 'react'
// import { Link, Router } from 'react-router-dom'

// import RandomPlanet from './RandomPlanet'

const PlanetList = props => {
  /*
  const planetNameList = props.planetData.map((planet,index) => 
    <li key={index}>
      <Link to={'/' + planet.pl_name.replace(/\s/g,'_')}>{planet.pl_name}</Link>
      <Router 
        path={'/:' + planet.pl_name.replace(/\s/g,'_')} 
        render={props => <RandomPlanet {...props} planetData={this.props.planetData} />}
      />
      </li>)
  */
  const planetNameList = props.planetData.map((planet,index) => <li key={index}>{planet.pl_name}</li>)
  return (
    <div>
      <ul>
        {planetNameList.length > 0 && planetNameList}
      </ul>
    </div>
  )
}

export default PlanetList
