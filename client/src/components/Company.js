import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getSingleCompany, joinCompany } from "../actions";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    this.props.dispatch(
      getSingleCompany(this.props.match.params.company_id, dataStatus => {
        if (dataStatus) {
          this.setState({
            isLoading: false
          });
        }
      })
    );
  }

  handleJoin = () => {
    if (!this.props.employee.isLogged) this.redirect(false);
    else
      this.props.dispatch(
        joinCompany(this.props.company.company._id, this.redirect)
      );
  };

  redirect = success => {
    if (success) this.props.history.push("/profile");
    else this.props.history.push("/login");
  };

  render() {
    let { company } = this.props.company;
    let { employee } = this.props.employee;
    let { isLoading } = this.state;

    return (
      <div>
        <div className="Companies">
          {!isLoading ? (
            <div>
              <p>{company.name}</p>
              {employee && employee.currentCompany ? (
                ""
              ) : (
                <>
                  <button onClick={this.handleJoin}>Join</button>
                </>
              )}

              <p>Past Employees : {company.currentEmployees.length}</p>
              <p>Past Employees : {company.pastEmployee.length}</p>

              {company.currentEmployees.length ? (
                <div className="current-employees">
                  <h6>Current Employees</h6>
                  {company.currentEmployees.map((employee, i) => (
                    <p key={i}>{employee.name}</p>
                  ))}
                </div>
              ) : (
                ""
              )}

              {company.pastEmployee.length ? (
                <div className="past-employees">
                  <h6>Past Employees</h6>
                  {company.pastEmployee.map((employee, i) => (
                    <p key={i}>{employee.name}</p>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    company: state.company,
    employee: state.employee,
    isLogged: state.employee.isLogged
  };
};

export default withRouter(connect(mapStateToProps)(Homepage));
