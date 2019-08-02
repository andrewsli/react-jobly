import React, { Component } from 'react';
import "./JobCard.css";
import JoblyApi from './JoblyApi';
import UserContext from './UserContext';

class JobCard extends Component {
  static contextType = UserContext;
  constructor(props){
    super(props);

    this.applied = this.applied.bind(this);
    this.handleApply = this.handleApply.bind(this);
  }

  async handleApply() {
    await JoblyApi.applyJob(this.props.id);
    this.props.updateJobs();
  }

  applied(){
    const currUser = this.context;
    const { id } = this.props;
    return (currUser.jobs.findIndex(job => job.id === id) !== -1);
  }

  render() {
    const { equity, salary, title } = this.props;
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
        <button
          className="jobCard-button"
          onClick={this.handleApply}
          disabled={this.applied()}>
          {this.applied() ? "Applied" : "Apply"}</button>
      </div>
    );
  }
}

export default JobCard;
