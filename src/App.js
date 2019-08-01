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
      currUser: null
    }

    this.login = this.login.bind(this);
    this.logOut = this.logOut.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  async componentDidMount() {
    if (localStorage.token) {
      try {
        let user = (await jwt.decode(localStorage.token)).username;
        let profile = await JoblyApi.getUser(user);

        this.setState({ currUser: profile })
      } catch (err) {
        this.setState({ currUser: null });
      }
    } else {
      this.setState({ currUser: null });
    }
  }

  async login() {
    try {
      let user = (await jwt.decode(localStorage.token)).username;
      let profile = await JoblyApi.getUser(user);

      this.setState({ currUser: profile })
    } catch (err) {
      this.setState({ currUser: null });
    }
  }

  logOut() {
    localStorage.removeItem("token");
    this.setState({ currUser: null });
  }

  updateUser(updatedUser) {
    const {username, first_name, last_name, email, photo_url} = updatedUser;
    this.setState({currUser: {username, first_name, last_name, email, photo_url}});
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Nav currUser={this.state.currUser} />
          <Routes currUser={this.state.currUser} loginUser={this.login} logOutUser={this.logOut} updateUserDetails={this.updateUser}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
