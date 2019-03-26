import React from 'react'

const PlanetList = props => {
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
