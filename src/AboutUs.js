import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AboutUs extends Component {
  render () {
    return (
      <div>
        <h2>About Us</h2>
        <ul>
          <li>
            <Link to={`/aboutus/profile`}>
              Profile
            </Link>
          </li>
          <li>
            <Link to={`/aboutus/team`}>
              Team
            </Link>
          </li>
          <li>
            <Link to={`/aboutus/contact`}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default AboutUs;