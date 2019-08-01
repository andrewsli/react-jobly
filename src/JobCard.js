import React, { Component } from 'react';
import JoblyApi from "./JoblyApi";
import "./JobCard.css"

class JobCard extends Component {
  render() {
    return (
      <div className="jobCard">
          <div className="jobCard-title">
            <h3>{this.props.title}</h3>
          </div>
          <div className="jobCard-salary">
            Salary: {this.props.salary}
          </div>
          <div className="jobCard-equity">
            Equity: {this.props.equity}
          </div>
          <button className="jobCard-button">Apply</button>
        </div>
    );
  }
}

export default JobCard;
