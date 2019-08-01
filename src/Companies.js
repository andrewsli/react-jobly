import React, { Component } from 'react';
import Search from "./Search";
import CompanyCard from "./CompanyCard";
import JoblyApi from "./JoblyApi";

class Companies extends Component {
  constructor(props){
    super(props);
    this.state = {
      companies: []
    }
    this.handleCompanySearch = this.handleCompanySearch.bind(this);
  }

  async componentDidMount() {
    let companies = await JoblyApi.getCompanies();
    this.setState({ companies })
  }

  // {search, min_employees, max_employees} => 
  async handleCompanySearch(searchTerms){
    let companies = await JoblyApi.getCompanies(searchTerms);
    this.setState({ companies });
  }

  render() {
    const companies = this.state.companies.map(company => 
      <CompanyCard {...company} key={company.handle}/>);

    return (
      <div>
        <Search searchFor="companies" searchCompanies={this.handleCompanySearch}/>
        {companies}
      </div>
    );
  }}

export default Companies;
