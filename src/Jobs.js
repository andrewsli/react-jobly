import React, { Component } from 'react';
import Search from "./Search";
import JoblyApi from "./JoblyApi";
import JobCard from "./JobCard";

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: []
    }
    this.handleJobSearch = this.handleJobSearch.bind(this);
  }

  async componentDidMount() {
    let jobs = await JoblyApi.getJobs();
    this.setState({ jobs })
  }

  // {search, min_employees, max_employees} => 
  async handleJobSearch(searchTerms) {
    let jobs = await JoblyApi.getJobs(searchTerms);
    this.setState({ jobs });
  }

  render() {
    const jobs = this.state.jobs.map(job => 
      <JobCard {...job} key={job.id}/>);

    return (
      <div>
        <Search searchFor="jobs" searchJobs={this.handleJobSearch}/>
        {jobs}
      </div>
    );
  }
}

export default Jobs;