import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/";

class JoblyApi {
  static async request(endpoint, paramsOrData = {}, verb = "get") {
    paramsOrData._token = localStorage.token;

    // console.debug("API Call:", endpoint, paramsOrData, verb);

    try {
      return (await axios({
        method: verb,
        url: `${BASE_URL}${endpoint}`,
        [verb === "get" ? "params" : "data"]: paramsOrData
      })).data;
      // axios sends query string data via the "params" key,
      // and request body data via the "data" key,
      // so the key we need depends on the HTTP verb
    }

    catch (err) {
      // console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getCompanies(query) {
    if (query !== undefined &&
      query['min_employees'] !== undefined &&
      query['min_employees'] !== null &&
      query['min_employees'] !== '' &&
      query['max_employees'] !== undefined &&
      query['max_employees'] !== null &&
      query['max_employees'] !== '') {
      if (query['min_employees'] > query['max_employees']) {
        throw new Error("Min employees is larger than max employees");
      }
    }
    let queryString = '';
    for (let key in query) {
      if (queryString !== '') {
        queryString += '&'
      }
      if (query[key] !== null && query[key] !== undefined && query[key] !== '') {
        queryString += `${key}=${query[key]}`;
      }
    }
    let res = await this.request(`companies?${queryString}`);
    return res.companies;
  }

  static async addCompany(companyDetails) {
    try {
      let res = await this.request(`companies`, companyDetails, "post");
      return res.company;
    } catch (err) {
      throw err;
    }
  }

  static async updateCompany(handle, companyDetails) {
    let res = await this.request(`companies/${handle}`, companyDetails, "patch");
    return res.company;
  }

  static async deleteCompany(handle) {
    let res = await this.request(`companies/${handle}`, {}, "delete");
    return res.message;
  }

  static async getJob(jobId) {
    let res = await this.request(`jobs/${jobId}`);
    return res.job;
  }

  static async getJobs(query) {
    let queryString = '';

    for (let key in query) {
      if (queryString !== '') {
        queryString += '&'
      }
      if (query[key] !== null && query[key] !== undefined && query[key] !== '') {
        queryString += `${key}=${query[key]}`;
      }
    }
    let res = await this.request(`jobs?${queryString}`);
    return res.jobs;
  }

  static async addJob(jobDetails) {
    let res = await this.request(`jobs/`, jobDetails, "post");
    return res.job;
  }

  static async updateJob(jobId, jobDetails) {
    let res = await this.request(`jobs/${jobId}`, jobDetails, "patch");
    return res.job;
  }

  static async deleteJob(jobId) {
    let res = await this.request(`jobs/${jobId}`, {}, "delete");
    return res.message;
  }

  // ADD TEST FOR THIS ONE LATER
  static async applyJob(jobId) {
    let res = await this.request(`jobs/${jobId}/apply`, {}, "post");
    return res.message;
  }

  static async getUsers() {
    let res = await this.request(`users/`);
    return res.users;
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  //{username, password, firstName, lastName, email}
  static async addUser(userDetails) {
    let res = await this.request(`users/`, userDetails, "post");
    return res.token;
  }

  static async updateUser(username, userDetails) {
    let res = await this.request(`users/${username}`, userDetails, "patch");
    return res.user;
  }

  static async deleteUser(userId) {
    let res = await this.request(`users/${userId}`, {}, "delete");
    return res.message;
  }

  //{username, password}
  static async logIn(loginDetails) {
    let res = await this.request('login', loginDetails, "post");
    return res.token
  }

}

export default JoblyApi;