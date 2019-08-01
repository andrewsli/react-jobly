import React, { Component } from 'react';
import JoblyApi from "./JoblyApi";
import jwt from "jsonwebtoken";
import { Redirect } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currUser: {},
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      email: '',
      photo_url: '',
      loading: true
    }

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    if (localStorage.token) {
      try {
        let user = (await jwt.decode(localStorage.token)).username;
        let profile = await JoblyApi.getUser(user);

        let { username, first_name, last_name, email, photo_url } = profile;
        this.setState({ username, first_name, last_name, email, photo_url, currUser: profile, loading: false });
      } catch {
        this.setState({ loading: false })
      }
    } else {
      this.setState({ loading: false })
    }
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const { username, password, first_name, last_name, email, photo_url } = this.state;
    const userDetails = { username, password, first_name, last_name, email, photo_url };
    for (let key in userDetails) {
      if (userDetails[key] === undefined || userDetails[key] === null || userDetails[key] === '') {
        delete userDetails[key];
      }
    }
    await JoblyApi.updateUser(username, userDetails);
  }

  render() {
    if (this.state.loading === true) {
      return <p>Loading...</p>
    } else {
      if (Object.keys(this.state.currUser).length === 0) {
        return <Redirect to={{
          pathname: '/login',
          state: { needsLogin: true }
        }} />
      }
    }

    const { username, first_name, last_name, email, photo_url, password } = this.state;
    return (
      <div>
        <h1>Profile</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Username</label>
          <input name="username" disabled={true} value={username} onChange={this.handleChange} />
          <label>First Name</label>
          <input name="first_name" value={first_name} onChange={this.handleChange} />
          <label>Last Name</label>
          <input name="last_name" value={last_name} onChange={this.handleChange} />
          <label>Email</label>
          <input name="email" value={email} onChange={this.handleChange} />
          <label>Photo URL</label>
          <input name="photo_url" value={photo_url ? photo_url : ''} onChange={this.handleChange} />
          <label>Re-enter Password</label>
          <input name="password" type="password" value={password} onChange={this.handleChange} />
          <button>Save Changes</button>
        </form>
      </div>
    );
  }
}

export default Profile;
