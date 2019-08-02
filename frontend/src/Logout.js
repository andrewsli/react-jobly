import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

class Logout extends Component {
  componentDidMount() {
    this.props.logOutUser();
  }

  render() {
    return <Redirect to="/"/>
  }
}

export default Logout;