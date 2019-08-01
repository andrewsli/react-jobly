import React, { Component } from 'react';
import Search from "./Search";
import JoblyApi from "./JoblyApi";
import JobCard from "./JobCard";
import jwt from "jsonwebtoken";
import { Redirect } from "react-router-dom";

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      loading: true,
      currUser: {}
    }
    this.handleJobSearch = this.handleJobSearch.bind(this);
  }

  async componentDidMount() {
    if (localStorage.token) {
      try {
        let user = (await jwt.decode(localStorage.token)).username;
        let profile = await JoblyApi.getUser(user);

        let jobs = await JoblyApi.getJobs();
        this.setState({ jobs, currUser: profile, loading: false })
      } catch (err) {
        this.setState({ loading: false });
      }
    } else {
      this.setState({ loading: false });
    }
  }

  // {search, min_employees, max_employees} => 
  async handleJobSearch(searchTerms) {
    this.setState({ loading: true }, async function () {
      let jobs = await JoblyApi.getJobs(searchTerms);
      this.setState({ jobs, loading: false });
    })
  }

  render() {
    if (this.state.loading === true) {
      return <p>Loading...</p>
    } else {
      if (Object.keys(this.state.currUser).length === 0) {
        return <Redirect to={{
          pathname: '/login',
          state: { needsLogin: true }
        }} />
      }
    }

    const jobs = this.state.jobs.map(job =>
      <JobCard equity={job.equity}
        salary={job.salary}
        title={job.title}
        key={job.id} />);

    return (
      <div>
        <Search searchFor="jobs" searchJobs={this.handleJobSearch} />
        {jobs}
      </div>
    );
  }
}

export default Jobs;