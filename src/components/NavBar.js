import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = props => {
  return (
    <div className="textbg nav">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/random-planet">Random Planet</Link>
        <Link to="/about">About</Link>
      </nav>
    </div>
  )
}

export default NavBar
