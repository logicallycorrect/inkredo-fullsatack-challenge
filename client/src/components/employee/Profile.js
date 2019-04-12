import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getProfile, leaveCompany } from "../../actions";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    if (!this.props.isLogged) this.props.history.push("/login");
    else
      this.props.dispatch(
        getProfile(dataStatus => {
          if (dataStatus) {
            this.setState({
              isLoading: false
            });
          }
        })
      );
  }

  handleLeave = () => {
    console.log(this.props.employee, "front end");
    this.props.dispatch(
      leaveCompany(
        this.props.employee.employee.currentCompany.company._id,
        this.redirect
      )
    );
  };

  redirect = success => {
    if (success) {
      this.props.dispatch(
        getProfile(status => {
          if (status) {
            this.props.history.push("/");
          }
        })
      );
    }
  };

  render() {
    let { employee } = this.props.employee;
    console.log(employee);
    let { isLoading } = this.state;

    return (
      <div>
        <div className="Profile">
          {!isLoading ? (
            <>
              <div className="employee-datails">
                <h5>Employee Name : {employee.name}</h5>
                <button>
                  {" "}
                  <Link to="/create_company">Create Company</Link>
                </button>
                {employee.currentCompany ? (
                  <div>
                    <p>
                      Current Company : {employee.currentCompany.company.name}
                    </p>
                    <button onClick={this.handleLeave}>Leave</button>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="employee-past-company">
                {employee.companyHistory.map((company, i) => (
                  <div key={i} className="">
                    <p key={i}>
                      {i + 1}.{company.company.name}
                    </p>
                    <p>
                      Joining Date :{" "}
                      {new Date(company.joiningDate).toDateString()}
                    </p>
                    <p>
                      Leaving Date :{" "}
                      {new Date(company.leavingDate).toDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </>
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
    employee: state.employee,
    isLogged: state.employee.isLogged
  };
};

export default withRouter(connect(mapStateToProps)(Profile));
