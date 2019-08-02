import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Jobly</h1>
        <p>All the jobs in one, convenient place.</p>
        {this.props.currUser ? <h2>Welcome Back!</h2> : <Link to="/login">Log in</Link>}

      </div>
    );
  }
}

export default Home;
