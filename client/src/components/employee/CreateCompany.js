import React, { Component } from "react";
import { createCompany } from "../../actions";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

class CreateCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {
        name: ""
      }
    };
  }

  componentDidMount() {
    console.log(this.props, "check frontend");
    if (!this.props.isLogged) this.props.history.push("/login");
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatch(createCompany(this.state.company, this.redirectUser));
  };

  redirectUser = success => {
    if (success) this.props.history.push("/");
  };

  updateValue = event => {
    this.setState({
      company: {
        ...this.state.company,
        [event.target.name]: event.target.value
      }
    });
  };

  render() {
    return (
      <div className="create-company">
        <h4>Create Company</h4>

        <form className="form" onSubmit={this.handleSubmit}>
          <label>Company Name</label>
          <input
            type="text"
            name="name"
            onChange={this.updateValue}
            required
            id="name"
          />
          <button type="submit">Create</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogged: state.employee.isLogged
  };
};

export default withRouter(connect(mapStateToProps)(CreateCompany));
