import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./companyCard.css";

const DEFAULT_LOGO = 'https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png';

class CompanyCard extends Component {
  render() {
    const { name, description, logo_url, handle } = this.props;
    return (
      <div className="companyCard">
        <div className="companyCard-name">
            <h3>{name}</h3>
          </div>
          <div className="companyCard-description">
            {description}
          </div>
          <div className="companyCard-logo">
            <img style={{ maxWidth: "100%", maxHeight: "100%" }}
              src={logo_url || DEFAULT_LOGO}
              alt={handle} />
          </div>
        <Link className="companyCard-link" to={`/companies/${handle}`}/>
      </div>

    )
  }
}

export default CompanyCard;