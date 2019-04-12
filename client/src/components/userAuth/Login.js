import React, { Component } from "react";
import { loginSubmit } from "./../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCred: {
        username: "",
        password: ""
      },
      error: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatch(loginSubmit(this.state.userCred, this.redirectUser));
  };

  redirectUser = (success, errorMsg = "") => {
    console.log("post success:", success, errorMsg);
    if (success) {
      this.props.history.push("/");
    } else {
      this.setState({
        error: errorMsg
      });
    }
  };

  updateValue = event => {
    this.setState({
      userCred: {
        ...this.state.userCred,
        [event.target.name]: event.target.value
      },
      error: ""
    });
  };

  render() {
    return (
      <div className="Login">
        <div>Login</div>

        <form className="form" onSubmit={this.handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            onChange={this.updateValue}
            required
            id="email"
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={this.updateValue}
            required
            id="password"
          />
          <button type="submit">Login</button>
        </form>
        <div>
          <Link to="/register">New here? Register instead</Link>
        </div>
      </div>
    );
  }
}

export default connect()(Login);
