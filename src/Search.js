import React, { Component } from 'react';
import InputField from "./InputField";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      // empty string because we want placeholder values to show
      // for the following keys
      min_employees: '', 
      max_employees: '',
      min_salary: '',
      min_equity: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(evt) {
    console.log(evt.target);
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { search, min_employees, max_employees, min_salary, min_equity } = this.state;
    if (this.props.searchFor === "companies") {
      const searchTerms = {
        search,
        min_employees,
        max_employees
      }
      this.props.searchCompanies(searchTerms);
    } else {
      const searchTerms = {
        search,
        min_salary,
        min_equity
      }
      this.props.searchJobs(searchTerms);
    }
  }

  shouldBeDisabled() {
    const { max_employees, min_employees } = this.state;
    return ((max_employees !== null && max_employees !== undefined && max_employees !== '')
      &&
      (min_employees !== null && min_employees !== undefined && min_employees !== '')
      &&
      (min_employees > max_employees))
  }

  renderForm() {
    const { search, max_employees, min_employees, min_salary, min_equity } = this.state;
    const { searchFor } = this.props;

    return (
      // <InputField id/name/htmlFor="search", placeholder/label:, value, handleChange /> or just pojos
      <div>
        <form onSubmit={this.handleSubmit}>
          <InputField
            id="search"
            placeholder={searchFor === "companies" ? "Name" : "Title"}
            value={search}
            handleChange={this.handleChange}
          />
          {/* <label htmlFor="search">{searchFor === "companies" ? "Name: " : "Title: "}</label>
          <input
            id="search"
            name="search"
            value={search}
            onChange={this.handleChange}
            placeholder="search" /> */}
          {searchFor === "companies" ? renderCompaniesSearch() : renderJobsSearch()}
          {/* <label htmlFor={searchFor === "companies" ? "min_employees" : "min_salary"}>
            {searchFor === "companies" ? "Min employees: " : "Min salary: "}
          </label>
          <input
            id={searchFor === "companies" ? "min_employees" : "min_salary"}
            name={searchFor === "companies" ? "min_employees" : "min_salary"}
            type="number"
            value={searchFor === "companies" ? min_employees : min_salary}
            onChange={this.handleChange}
            placeholder={searchFor === "companies" ? "Min employees" : "Min salary"} /> */}

          <label htmlFor={searchFor === "companies" ? "max_employees" : "min_equity"}>
            {searchFor === "companies" ? "Max employees: " : "Min equity: "}
          </label>
          <input
            id={searchFor === "companies" ? "max_employees" : "min_equity"}
            name={searchFor === "companies" ? "max_employees" : "min_equity"}
            type="number"
            step={searchFor === "companies" ? 1 : "any"}
            value={searchFor === "companies" ? max_employees : min_equity}
            onChange={this.handleChange}
            placeholder={searchFor === "companies" ? "Max employees" : "Min equity"} />
          <button
            disabled={searchFor === "companies" ? this.shouldBeDisabled() : false}>Search</button>
        </form>
      </div>
    )
  }

  render() {
    return this.renderForm();
  }
}
export default Search;