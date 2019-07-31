import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import "./Nav.css";

class Nav extends Component {
  static defaultProps={
    loggedIn: false,
  }
  
  render() {
    return (
      <nav className="Nav">
        <NavLink exact to="/">Home</NavLink>
        <NavLink exact to="/companies">Companies</NavLink>
        <NavLink exact to="/jobs">Jobs</NavLink>
        <NavLink exact to="/profile">Profile</NavLink>
        {this.props.loggedIn
          ?
          <NavLink exact to="/logout">Logout</NavLink>
          :
          <NavLink exact to="/login">Login</NavLink>
        }
      </nav>
    );
  }
}

export default Nav;
