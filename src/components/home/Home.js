import React from 'react'
import { withSiteData, Router, Link } from 'react-static'
//

import './home.css'

export default withSiteData(() => (
  <div className="home-container">
    <div className="opening-banner">
      <div className="opening-banner__left">
        <h1 id="opening-banner__title">Amazing Tagline</h1>
        <h3 id="opening-banner__subtitle">
          Things we are doing here are pretty awesome. It's impossible to descibe how awesome, as a matter of fact. If I tried, I might perish
        </h3>
        <Link id="opening-banner__link" to="/about">
          <p>Go to Map &#8618;</p>
        </Link>
      </div>
      <div className="opening-banner__right" />
    </div>
    <div className="body-navigation">
      <div className="body-navigation__item">
        <div id="body-navigation__bibliome-image" />
        <h1>Bibliome &#8618;</h1>
        <h3>Bibliome Description</h3>
      </div>
      <div className="body-navigation__item">
        <div id="body-navigation__cellmap-image" />
        <h1>Cell Map &#8618;</h1>
        <h3>
          A metabolic map of the human erythrocyte (created using Escher) and a hub for connecting to experimental data, academic studies, and
          databases on the red blood cell.
        </h3>
      </div>
      <div className="body-navigation__item">
        <div id="body-navigation__datarep-image" />
        <h1>Data Repository &#8618;</h1>
        <h3>Data Repository</h3>
      </div>
    </div>
    <div className="closing-banner">
      <div className="closing-banner__left">
        <h1 className="closing-banner__left-title">Contribute</h1>
        <h2 className="closing-banner__left-body">
          We are always attempting to make ErythroDB as complete of a resource as possible; please email James ( jyurkovich AT ucsd DOT edu) to upload
          data, add figures, or include an article in the bibliom. Other suggestions for how to improve ErythroDB are always welcome!
        </h2>
      </div>
      <div className="closing-banner__right">
        <h1 className="closing-banner__right-title">Citations</h1>
        <h2 className="closing-banner__right-body">You can help support ErythroDB by citing our publication when you use ErythroDB:</h2>
        <h4 className="closing-banner__right-cite">
          JT Yurkovich, BJ Yurkovich, A Draeger, BO Palsson, and ZA King. 2017 "A Padawan Programmer's Guide to Developing Software Libraries."Cell
          Systems, 5(5):431-437
        </h4>
      </div>
    </div>
  </div>
))
