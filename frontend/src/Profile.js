import React, { Component } from 'react';
import JoblyApi from "./JoblyApi";
import { Redirect } from "react-router-dom";
import UserContext from './UserContext';

class Profile extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      email: '',
      photo_url: '',
      loading: true,
      updated: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const currUser = this.context;
    if (currUser) {
      try {
        let { username, first_name, last_name, email, photo_url } = currUser;
        this.setState({ username, first_name, last_name, email, photo_url, loading: false });
      } catch {
        this.setState({ loading: false })
      }
    } else {
      this.setState({ loading: false })
    }
  }

  componentDidUpdate() {
    if (this.state.updated && !this.timerID) {
      this.timerID = setTimeout(() => { this.setState({ updated: false }) }, 3000);
    }
  }

  componentWillUnmount() {
    if (this.timerID) {
      clearTimeout(this.timerID);
    }
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const { username, password, first_name, last_name, email, photo_url } = this.state;
    const userDetails = { password, first_name, last_name, email, photo_url };
    for (let key in userDetails) {
      if (userDetails[key] === undefined ||
        userDetails[key] === null ||
        userDetails[key] === '') {
        delete userDetails[key];
      }
    }
    let updatedUser = await JoblyApi.updateUser(username, userDetails);
    this.props.updateCurrUser(updatedUser);
    this.setState({ updated: true, password: '' });
  }

  render() {
    const currUser = this.context;
    if (this.state.loading === true) {
      return <p>Loading...</p>
    } else {
      if (!currUser) {
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
          <label>New Password</label>
          <input name="password" type="password" value={password} onChange={this.handleChange} />
          <br />
          {this.state.updated ?
            <p>User successfully updated</p> :
            <button disabled={this.state.password === ''}>
              Save Changes
            </button>
          }
        </form>
      </div>
    );
  }
}

export default Profile;
