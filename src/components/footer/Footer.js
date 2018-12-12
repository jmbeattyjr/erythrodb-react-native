import React from 'react'
import { Router, Link } from 'react-static'
import { hot } from 'react-hot-loader'

import './footer.css'

class Footer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className="main-footer">
        <div className="main-footer__left">
          <h4>&#9400; 2017 Regents of the University of California. All Rights Reserved.</h4>
        </div>
        <div className="main-footer__right">
          <h4>
            ErythroDB is distributed under the MIT license. Currently only Google Chrome is fully supported with the ErythroDB Map; we are working to
            also support the latest versions of Firefox, Internet Explorer, and Safari.
          </h4>
        </div>
      </div>
    )
  }
}

export default Footer
