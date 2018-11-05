import React from 'react'
import { withSiteData, Router, Link, withRouteData } from 'react-static'
//

import './home.css'
// import { bindActionCreators } from 'redux'

class Home extends React.Component {
  state = {}

  componentWillMount() {
    let icons = {}
    let pics = {}
  }

  render() {
    console.log(this.props)
    console.log(this.state)
    return (
      <div className="home-container">
        <div className="opening-banner">
          <div className="opening-banner__left">
            <h1 id="opening-banner__title">{this.props.home.openingBannerLeft.title}</h1>
            <h3 id="opening-banner__subtitle">{this.props.home.openingBannerLeft.subtitle}</h3>
            <Link id="opening-banner__link" to="/cellMap">
              <p>{this.props.home.openingBannerLeft.link} &#8618;</p>
            </Link>
          </div>
        </div>
        <div className="body-navigation">
          <Link className="body-navigation__item" to="/bibliome">
            <div id="body-navigation__bibliome-image" />
            <h1>{this.props.home.bodyNavigation.Bibliome.heading} &#8618;</h1>
            <h3>{this.props.home.bodyNavigation.Bibliome.body}</h3>
          </Link>
          <Link className="body-navigation__item" to="/cellMap">
            <div id="body-navigation__cellmap-image" />
            <h1>{this.props.home.bodyNavigation.CellMap.heading} &#8618;</h1>
            <h3>{this.props.home.bodyNavigation.CellMap.body}</h3>
          </Link>
          <Link className="body-navigation__item" to="/dataRepo">
            <div id="body-navigation__datarep-image" />
            <h1>{this.props.home.bodyNavigation.dataRep.heading} &#8618;</h1>
            <h3>{this.props.home.bodyNavigation.CellMap.body} </h3>
          </Link>
        </div>
        <div className="closing-banner">
          <div className="closing-banner__left">
            <h1 className="closing-banner__left-title">{this.props.home.closingBannerLeft.title}</h1>
            <h2 className="closing-banner__left-body">{this.props.home.closingBannerLeft.body}</h2>
          </div>
          <div className="closing-banner__right">
            <h1 className="closing-banner__right-title">{this.props.home.closingBannerRight.title}</h1>
            <h2 className="closing-banner__right-body">{this.props.home.closingBannerRight.body}</h2>
            <h4 className="closing-banner__right-cite">{this.props.home.closingBannerRight.cite}</h4>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouteData(Home)
