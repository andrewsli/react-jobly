import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Nav from "./Nav";
import Routes from "./Routes";
import jwt from "jsonwebtoken";
import JoblyApi from "./JoblyApi";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currUser: null,
      loading: true
    }

    this.login = this.login.bind(this);
    this.logOut = this.logOut.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.updateJobs = this.updateJobs.bind(this);
  }

  //call login to get rid of duplicate code
  async componentDidMount() {
    if (localStorage.token) {
      let currUser = await this.getUser();
      this.setState({ currUser, loading: false });
    } else {
      this.setState({ currUser: null, loading: false });
    }
  }

  async login() {
    let currUser = await this.getUser();
    this.setState({ currUser });
  }

  async getUser() {
    try {
      let user = (await jwt.decode(localStorage.token)).username;
      let profile = await JoblyApi.getUser(user);
      return profile;
    } catch (err) {
      return null;
    }
  }

  logOut() {
    localStorage.removeItem("token");
    this.setState({ currUser: null });
  }

  updateUser(updatedUser) {
    const { username, first_name, last_name, email, photo_url } = updatedUser;
    this.setState({ currUser: { username, first_name, last_name, email, photo_url } });
  }

  async updateJobs() {
    let currUser = await this.getUser();
    this.setState({ currUser });
  }

  render() {
    if (this.state.loading) {
      return null;
    } else {
      return (
        <div className="App">
          <BrowserRouter>
            <Nav currUser={this.state.currUser} />
            <Routes currUser={this.state.currUser}
              loginUser={this.login}
              logOutUser={this.logOut}
              updateUserDetails={this.updateUser}
              updateUserJobs={this.updateJobs} />
          </BrowserRouter>
        </div>
      );
    }
  }
}

export default App;
