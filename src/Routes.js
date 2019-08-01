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
    const { updateUserDetails, currUser, loginUser, logOutUser } = this.props;
    return (
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/companies" render={() => <Companies currUser={currUser} />} />
        <Route exact path="/companies/:handle" render={(rtProps)=> <Company currUser={currUser} {...rtProps} />} />
        <Route exact path="/jobs" render={() => <Jobs currUser={currUser} />} />
        <Route exact path="/profile" render={() => <Profile updateCurrUser={updateUserDetails} currUser={currUser} />} />
        <Route exact path="/login" render={(rtProps) => <LoginSignup {...rtProps} currUser={currUser} loginUser={loginUser}/>} />
        <Route exact path="/logout" render={() => <Logout logOutUser={logOutUser}/>} />
        <Route render={() => <NotFound />}/>
        {/* Alternative for Not Found: <Redirect to="/" /> */}
      </Switch>
    );
  }
}

export default Routes;
