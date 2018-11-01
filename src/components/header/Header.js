import React from 'react'
import { Router, Link } from 'react-static'
import { hot } from 'react-hot-loader'

import './header.css'

import logo from './images/cell.png'

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className="main-header">
        <Link className="main-header__logo-container" exact to="/">
          <img className="main-header__logo" src={logo} alt="erythrodb" />
        </Link>
        <nav className="main-header__nav">
          <Link className="main-header__nav-link" exact to="/">
            Bibliome
          </Link>
          <Link className="main-header__nav-link" to="/about">Cell Map</Link>
          <Link className="main-header__nav-link" to="/blog">Data Repository</Link>
        </nav>
      </div>
    )
  }
}

export default Header
