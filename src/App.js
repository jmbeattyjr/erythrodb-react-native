import React from 'react'
import { Router, Link } from 'react-static'
import { hot } from 'react-hot-loader'
//
import Routes from 'react-static-routes'
import Header from "./components/header/Header"
import Footer from './components/footer/Footer'

import './app.css'
import './shared.css'

const App = () => (
  <Router>
    <div>
    <Header />
      <div className="content">
        <Routes />
      </div>
      <Footer/>
    </div>
  </Router>
)

export default hot(module)(App)
