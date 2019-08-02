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
    return ((max_employees !== null &&
             max_employees !== undefined &&
             max_employees !== '') 
            && (min_employees !== null &&
                min_employees !== undefined &&
                min_employees !== '')
            && (min_employees > max_employees))
  }

  generateCompanyFieldProps() {
    const { search, max_employees, min_employees } = this.state;
    return [{
      id: "search",
      placeholder: "Name",
      value: search,
      handleChange: this.handleChange
    },
    {
      id: "min_employees",
      placeholder: "Min employees",
      type: "number",
      value: min_employees,
      handleChange: this.handleChange
    },
    {
      id: "max_employees",
      placeholder: "Max employees",
      type: "number",
      value: max_employees,
      handleChange: this.handleChange
    }];
  }

  generateJobsFieldProps() {
    const { search, min_salary, min_equity } = this.state;
    return [{
      id: "search",
      placeholder: "Title",
      value: search,
      handleChange: this.handleChange
    },
    {
      id: "min_salary",
      placeholder: "Min salary",
      type: "number",
      value: min_salary,
      handleChange: this.handleChange
    },
    {
      id: "min_equity",
      placeholder: "Min equity",
      type: "number",
      step: "any",
      value: min_equity,
      handleChange: this.handleChange
    }];
  }

  render() {
    let inputs = null;

    if (this.props.searchFor === "companies") {
      inputs = this.generateCompanyFieldProps().map(
        attr => <InputField attributes={attr} key={attr.id}/>
      );
    } else {
      inputs = this.generateJobsFieldProps().map(
        attr => <InputField attributes={attr} key={attr.id}/>
      );
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {inputs}
          <button
            disabled={
              this.props.searchFor === "companies" ?
                this.shouldBeDisabled() :
                false}>
            Search
          </button>
        </form>
      </div>
    )
  }
}
export default Search;