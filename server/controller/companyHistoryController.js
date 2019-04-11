const Employee = require("../models/Employee");
const Company = require("../models/Company");
const CompanyHistory = require("../models/CompanyHistory");

module.exports = {
  joinCompany: (req, res) => {
    const employee_id = req.user._id;
    const company_id = req.params.company_id;
    console.log(employee_id, company_id, "latest check");
    const newCompanyHistory = new CompanyHistory({
      employee: employee_id,
      company: company_id
    });
    newCompanyHistory.save((err, companyHistory) => {
      if (err) {
        return res.json({
          success: false,
          message: err
        });
      } else {
        Employee.findByIdAndUpdate(
          employee_id,
          { currentCompany: companyHistory._id },
          { new: true },
          (err, post) => {
            if (err)
              return res.json({
                message: err,
                success: false
              });
            else {
              Company.findByIdAndUpdate(
                company_id,
                { $push: { currentEmployees: employee_id } },
                { new: true },
                (err, post) => {
                  if (err)
                    return res.json({
                      message: err,
                      success: false
                    });
                  else {
                    return res.status(201).json({
                      success: true,
                      message: "New Company Joined"
                    });
                  }
                }
              );
            }
          }
        );
      }
    });
  },

  // complete leave company
  leaveCompany: (req, res) => {
    const employee_id = req.user._id;
    const company_id = req.params.company_id;

    Employee.findOneAndUpdate(
      { _id: employee_id },
      { currentCompany: "", $push: { companyHistory: company_id } },
      (err, employee) => {
        if (err || !employee) {
          return res.status(404).json({
            success: false,
            message: err
          });
        } else {
          CompanyHistory.findByIdAndUpdate(
            employee.currentCompany,
            { leavingDate: Date.now() },
            { new: true },
            (err, data) => {
              if (err || !data) {
                return res.status(404).json({
                  success: false,
                  message: err
                });
              } else {
                Company.findByIdAndUpdate(
                  { _id: company_id },
                  {
                    $pull: { currentEmployees: employee_id },
                    $push: { pastEmployee: employee_id }
                  },
                  { new: true },
                  (err, data) => {
                    if (err || !data) {
                      return res.status(404).json({
                        success: false,
                        message: err
                      });
                    } else {
                      return res.status(201).json({
                        success: true,
                        message: "New Company Joined"
                      });
                    } // end of else
                  }
                ); // end of company
              }
            }
          ); // end of companyHistory
        } // end of else
      }
    );
  }
}; // end of module exports
