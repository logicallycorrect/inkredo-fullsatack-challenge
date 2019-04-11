import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./components/Header";
// import Homepage from "./components/Header";
import Login from "./components/userAuth/Login";
import Register from "./components/userAuth/Register";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="App-main">
            <Switch>
              {/* Profile & User auth pages */}
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
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
