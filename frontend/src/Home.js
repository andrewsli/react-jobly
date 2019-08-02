import React, { Component } from 'react';
import { Link } from "react-router-dom";
import UserContext from './UserContext';

class Home extends Component {
  static contextType = UserContext;

  render() {
    const currUser = this.context;
    return (
      <div>
        <h1>Jobly</h1>
        <p>All the jobs in one, convenient place.</p>
        {currUser ? <h2>Welcome Back!</h2> : <Link to="/login">Log in</Link>}

      </div>
    );
  }
}

export default Home;
