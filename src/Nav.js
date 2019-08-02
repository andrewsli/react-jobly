import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from "./UserContext";
import "./Nav.css";

class Nav extends Component {
  static contextType = UserContext;
  render() {
    const currUser = this.context;
    return (
        <nav className="Nav">
          <NavLink exact to="/">Home</NavLink>
          <NavLink exact to="/companies">Companies</NavLink>
          <NavLink exact to="/jobs">Jobs</NavLink>
          <NavLink exact to="/profile">Profile</NavLink>
          {currUser
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
