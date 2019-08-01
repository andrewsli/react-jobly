import React, { Component } from 'react';
import JoblyApi from "./JoblyApi";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: null,
      min_employees: null,
      max_employees: null,
      min_salary: null,
      min_equity: null,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitCompany = this.handleSubmitCompany.bind(this);
    this.handleSubmitJob = this.handleSubmitJob.bind(this);

  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmitCompany(evt) {
    evt.preventDefault();
    const { search, min_employees, max_employees } = this.state;
    const searchTerms = {
      search,
      min_employees,
      max_employees
    }
    this.props.searchCompanies(searchTerms);
  }

  handleSubmitJob(evt) {
    evt.preventDefault();
    const { search, min_salary, min_equity } = this.state;
    const searchTerms = {
      search,
      min_salary,
      min_equity
    }
    this.props.searchJobs(searchTerms);
  }
  renderCompanies() {
    return (
      <div>
        <form onSubmit={this.handleSubmitCompany}>
          <label htmlFor="search"></label>
          <input
            name="search"
            value={this.state["search"]}
            onChange={this.handleChange}
            placeholder="search"></input>

          <label htmlFor="min_employees"></label>
          <input
            name="min_employees"
            type="number"
            value={this.state["min_employees"]}
            onChange={this.handleChange}
            placeholder="min employees"></input>

          <label htmlFor="max_employees"></label>
          <input
            name="max_employees"
            type="number"
            value={this.state["max_employees"]}
            onChange={this.handleChange}
            placeholder="max employees"></input>
          <button
            disabled={this.state.min_employees > this.state.max_employees}>Search</button>
        </form>
      </div>
    )
  }

  renderJobs() {
    return (
      <div>
        <form onSubmit={this.handleSubmitJob}>
          <label htmlFor="search"></label>
          <input
            name="search"
            value={this.state["search"]}
            onChange={this.handleChange}
            placeholder="search"></input>

          <label htmlFor="min_salary"></label>
          <input
            name="min_salary"
            type="number"
            value={this.state["min_salary"]}
            onChange={this.handleChange}
            placeholder="min salary"></input>

          <label htmlFor="min_equity"></label>
          <input
            name="min_equity"
            type="number"
            value={this.state["min_equity"]}
            onChange={this.handleChange}
            placeholder="min equity"></input>
          <button>Search</button>
        </form>
      </div>
    )
  }

  render() {
    if (this.props.searchFor === "companies") {
      return this.renderCompanies();
    }
    else if (this.props.searchFor === "jobs") {
      return this.renderJobs();
    }
    else {
      return <div>Wrong hood.</div>
    }
  }
}
export default Search;