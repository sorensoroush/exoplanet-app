import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = props => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/planet-list">List of Planets</Link>
      <Link to="/random-planet">Random Planet</Link>
    </nav>
  )
}

export default NavBar
