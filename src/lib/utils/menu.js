import React, { Component } from 'react';
import '../index.css'
import { Link } from 'react-router'

class Menu extends Component {

  render(){
    return (
      <div className={'menu'}>
        <ul>
          <li><Link to={'/'}>About</Link></li>
          <li><Link to={'/Viewer'}>Viewer</Link></li>
        </ul>
      </div>
    )
  }
}

export default Menu
