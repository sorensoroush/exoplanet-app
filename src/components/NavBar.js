import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = props => {
  return (
    <div className="textbg nav">
      <nav>
        <div className="a"><Link to="/">Home</Link></div>
        <div className="a"><Link to="/random-planet">Random Planet</Link></div>
        <div className="a"><Link to="/about">About</Link></div>
      </nav>
    </div>
  )
}

export default NavBar
