import axios from "axios";

class JoblyApi {
  static async request(endpoint, paramsOrData = {}, verb = "get") {
    paramsOrData._token = ( // for now, hardcode token for "testing"
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
      "eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjQ1OTY3Mzd9." +
      "HRbb76ZkCC5MC6EoHjfxmEvBKxtG1h2ZZ_Of67JgX8g");

    console.debug("API Call:", endpoint, paramsOrData, verb);

    try {
      return (await axios({
        method: verb,
        url: `http://localhost:3001/${endpoint}`,
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

  static async getCompanies() {
    let res = await this.request(`companies`);
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

  static async getJobs() {
    let res = await this.request(`jobs/`);
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

  static async getUsers() {
    let res = await this.request(`users/`);
    return res.users;
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

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

  static async logIn(loginDetails) {
    let res = await this.request('login', loginDetails, "post");
    return res.token
  }

}

export default JoblyApi;