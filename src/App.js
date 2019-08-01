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
        this.setState({ currUser: {} });
      }
    } else {
      this.setState({ currUser: {} });
    }
  }

  login() {
    this.setState({token: localStorage.token});
  }

  logOut() {
    localStorage.removeItem("token");
    this.setState({ token: null });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Nav token={this.state.token} />
          <Routes token={this.state.token} loginUser={this.login} logOutUser={this.logOut} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
