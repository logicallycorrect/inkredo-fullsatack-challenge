import React, { Component } from "react";
import { registerSubmit, showMessage } from "./../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCred: {
        name: "",
        email: "",
        password: "",
        username: ""
      },
      error: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    let { email, password } = this.state.userCred;
    let validEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
    let validPassword = /^(?=.*\d)(?=.*[a-z])(?=^[a-zA-Z0-9@#$%^&*]+$).{6,}$/.test(
      password
    );

    if (!validEmail) {
      this.setState({
        error: "Not a valid Email. Please Check and Try Again!"
      });
    } else if (!validPassword) {
      this.setState({
        error: "Not a valid Password. Please Check and Try Again!"
      });
    } else {
      this.props.dispatch(
        registerSubmit(this.state.userCred, this.redirectUser)
      );
    }
  };

  redirectUser = success => {
    if (success) this.props.history.push("/login");
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
      <div className="Register">
        <div className="top-header">Register</div>

        <form className="form" onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={this.updateValue}
            required
            id="name"
          />
          <label>Username</label>
          <input
            type="text"
            name="username"
            onChange={this.updateValue}
            required
            id="username"
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
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
          <div>
            Password must be atleast 6 character long, have atleast more than
            one alphabet, a number and a special character(@#$%^&*)
          </div>
          <button type="submit">Register</button>
        </form>
        <div>
          <Link to="/login">Already User? Login instead</Link>
        </div>
      </div>
    );
  }
}

export default connect()(Register);
