import React, { Component } from 'react';
import JoblyApi from "./JoblyApi";
import { Redirect } from "react-router-dom";

class LoginSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUp: false,
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      email: ''
    }

    this.toggleLogIn = this.toggleLogIn.bind(this);
    this.toggleSignUp = this.toggleSignUp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggleLogIn() {
    this.setState({
      signUp: false
    })
  }

  toggleSignUp() {
    this.setState({
      signUp: true
    })
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const { username, password, first_name, last_name, email } = this.state;
    let token = null;
    if (this.state.signUp) {
      token = await JoblyApi.addUser({ username, password, first_name, last_name, email });
    } else {
      token = await JoblyApi.logIn({ username, password });
    }
    //also set state in app
    localStorage.setItem("token", token)
    this.props.loginUser();
  }

  renderSignUp() {
    const { first_name, last_name, email } = this.state;
    return (
      <div>
        <label htmlFor="first_name">First name: </label>
        <input
          id="first_name"
          name="first_name"
          value={first_name}
          onChange={this.handleChange}
          placeholder="First name" />
        <label htmlFor="last_name">Last name: </label>
        <input
          id="last_name"
          name="last_name"
          value={last_name}
          onChange={this.handleChange}
          placeholder="Last name" />
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          name="email"
          value={email}
          onChange={this.handleChange}
          placeholder="Email" />
      </div>
    )
  }

  render() {
    if (this.props.currUser) {
      return (<Redirect to="/" />)
    }
    const { username, password } = this.state;
    const locationState = this.props.location.state;
    return (
      <div>
        {locationState && locationState.needsLogin ? <h3>Please log in.</h3> : null}
        <button onClick={this.toggleLogIn}>Log In</button>
        <button onClick={this.toggleSignUp}>Sign Up</button>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={this.handleChange}
            placeholder="Username" />
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
            placeholder="Password" />
          {this.state.signUp ? this.renderSignUp() : null}
          <button>{this.state.signUp ? "Sign up" : "Log in"}</button>
        </form>
      </div>
    );
  }
}

export default LoginSignup;
