import React, { Component } from 'react';
import "./JobCard.css"

class JobCard extends Component {
  render() {
    const {equity, salary, title} = this.props
    return (
      <div className="jobCard">
          <div className="jobCard-title">
            <h3>{title}</h3>
          </div>
          <div className="jobCard-salary">
            Salary: {salary}
          </div>
          <div className="jobCard-equity">
            Equity: {equity}
          </div>
          <button className="jobCard-button">Apply</button>
        </div>
    );
  }
}

export default JobCard;
