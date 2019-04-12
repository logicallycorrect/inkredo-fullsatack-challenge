import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Login from "./components/userAuth/Login";
import Register from "./components/userAuth/Register";
import Company from "./components/Company";
import Profile from "./components/employee/Profile";
import CreateCompany from "./components/employee/CreateCompany";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="App-main">
            <Switch>
              {/* Profile & User auth pages */}
              <Route exact path="/" component={Homepage} />
              <Route exact path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route exact path="/companies/:company_id" component={Company} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/create_company" component={CreateCompany} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogged: false
  };
};

export default connect(mapStateToProps)(App);
