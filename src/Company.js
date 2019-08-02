import React, { Component } from 'react';
import JoblyApi from "./JoblyApi";
import JobCard from "./JobCard";

class Company extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company: null,
      loading: true
    }
  }

  async componentDidMount() {
    let handle = this.props.match.params.handle;
    let company = await JoblyApi.getCompany(handle);

    this.setState({ company, loading: false });
  }

  renderCompanyDetails() {
    const { jobs, name, description } = this.state.company;
    return (
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
        {jobs.map(job =>
          <JobCard equity={job.equity}
            salary={job.salary}
            title={job.title}
            key={job.id} />
        )}
      </div>
    )
  }

  render() {
    return (
      this.state.loading ?
        <p>Fetching company</p> :
        this.renderCompanyDetails()
    );
  }
}

export default Company;
