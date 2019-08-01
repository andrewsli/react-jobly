import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import "./Nav.css";

class Nav extends Component {
  render() {
    return (
      <nav className="Nav">
        <NavLink exact to="/">Home</NavLink>
        <NavLink exact to="/companies">Companies</NavLink>
        <NavLink exact to="/jobs">Jobs</NavLink>
        <NavLink exact to="/profile">Profile</NavLink>
        {this.props.currUser 
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
