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

  renderLoading() {
    return (
      <p>Fetching company</p>
    )
  }

  renderCompanyDetails() {
    const { company } = this.state;
    console.log(company.jobs)
    return (
      <div>
        <h3>{company.name}</h3>
        <p>{company.description}</p>
        {company.jobs.map(job =>
          <JobCard {...job} key={job.id}/>
        )}
      </div>
    )
  }

  render() {
    return (
      this.state.loading
        ? this.renderLoading()
        : this.renderCompanyDetails()
    );
  }
}

export default Company;
