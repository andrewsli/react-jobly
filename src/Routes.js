import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import Home from "./Home";
import Companies from "./Companies";
import Jobs from "./Jobs";
import Profile from "./Profile";
import LoginSignup from "./LoginSignup";
import Company from "./Company";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/companies" render={() => <Companies />} />
        <Route exact path="/companies/:handle" render={(rtProps)=> <Company {...rtProps} />} />
        <Route exact path="/jobs" render={() => <Jobs />} />
        <Route exact path="/profile" render={() => <Profile />} />
        <Route exact path="/login" render={() => <LoginSignup />} />
        <Route exact path="/logout" render={() => <Home />} />
        <Route render={() => <NotFound />}/>
        {/* Alternative for Not Found: <Redirect to="/" /> */}
      </Switch>
    );
  }
}

export default Routes;
