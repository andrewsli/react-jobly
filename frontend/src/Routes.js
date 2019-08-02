import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import Home from "./Home";
import Companies from "./Companies";
import Jobs from "./Jobs";
import Profile from "./Profile";
import LoginSignup from "./LoginSignup";
import Company from "./Company";
import Logout from "./Logout";

class Routes extends Component {
  render() {
    const { updateUserDetails, loginUser, logOutUser } = this.props;
    return (
      <Switch>
        <Route exact path="/" render={() => <Home/>} />
        <Route exact path="/companies" render={() => <Companies />} />
        <Route exact path="/companies/:handle" render={(rtProps)=> <Company {...rtProps} updateCurrUser={updateUserDetails}/>} />
        <Route exact path="/jobs" render={() => <Jobs updateCurrUser={updateUserDetails}/>} />
        <Route exact path="/profile" render={() => <Profile updateCurrUser={updateUserDetails} />} />
        <Route exact path="/login" render={(rtProps) => <LoginSignup {...rtProps} loginUser={loginUser}/>} />
        <Route exact path="/logout" render={() => <Logout logOutUser={logOutUser}/>} />
        <Route render={() => <NotFound />}/>
      </Switch>
    );
  }
}

export default Routes;
