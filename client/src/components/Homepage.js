import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getAllCompany, getProfile } from "../actions";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    this.props.dispatch(
      getAllCompany(dataStatus => {
        if (dataStatus) {
          this.setState({
            isLoading: false
          });
        }
      })
    );
  }

  render() {
    let { companies } = this.props.companies;
    console.log(this.props);
    let { isLoading } = this.state;

    return (
      <div>
        <div className="Companies">
          {!isLoading
            ? companies.map(company => (
                <div key={company._id} className="company-card">
                  <h5>{company.name}</h5>
                  <p>Current Employees : {company.currentEmployees.length} </p>
                  <p>Past Employees : {company.pastEmployee.length}</p>
                  <button>
                    <Link to={`/companies/${company._id}`}>View</Link>
                  </button>
                </div>
              ))
            : ""}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    companies: state.company
  };
};

export default withRouter(connect(mapStateToProps)(Homepage));
