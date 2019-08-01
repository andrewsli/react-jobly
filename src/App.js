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
      token: localStorage.token,
      currUser: null
    }

    this.login = this.login.bind(this);
    this.logOut = this.logOut.bind(this);
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
    this.setState({token: localStorage.token});
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
    this.setState({ token: null, currUser: null });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Nav currUser={this.state.currUser} />
          <Routes currUser={this.state.currUser} loginUser={this.login} logOutUser={this.logOut} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
