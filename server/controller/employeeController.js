const Employee = require("../models/Employee");
const passport = require("passport");

module.exports = {
  createEmployee: (req, res) => {
    const newEmployee = new Employee({
      ...req.body
    });

    Employee.find({ username: newEmployee.username }, function(err, employee) {
      if (employee.length) {
        return res.json({
          message: "Username already exists. Try Logging-in Instead!",
          success: false
        });
      } else {
        Employee.find({ email: newEmployee.email }, function(err, employee) {
          if (employee.length) {
            return res.json({
              message: "Email already exists. Try Logging-in Instead!",
              success: false
            });
          } else {
            newEmployee.save((err, user) => {
              if (err) {
                return res.json({ message: err, success: false });
              }
              return res.status(201).json({
                user: user.username,
                success: true,
                message: "Registered Successfully!"
              });
            });
          }
        });
      }
    });
  },

  loginEmployee: function(req, res, next) {
    console.log(req.body, "check ashish");
    passport.authenticate("local", function(err, employee, { message }) {
      if (err) {
        return next(err);
      }
      if (!employee) {
        return res.json({
          success: false,
          message
        });
      }
      req.logIn(employee, function(err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          user: employee.username,
          message: "Successfully login",
          success: true
        });
      });
    })(req, res, next);
  },

  isLoggedIn: (req, res, next) => {
    // req.user
    if (req.session.passport) {
      return next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Please login to get access"
      });
    }
  },

  loggedOut: (req, res) => {
    req.session.destroy();
    res.status(200).json({
      success: true,
      message: "Session is removed & User Is LoggedOut"
    });
  },

  getEmployee: (req, res) => {
    const employee = req.user;
    console.log(req, "check1");
    Employee.findOne({ _id: employee })
      .select("-password -email")
      .populate([
        {
          path: "currentCompany",
          select: "company",
          populate: { path: "company", select: "name" }
        },

        {
          path: "companyHistory",
          select: "company joiningDate leavingDate",
          populate: { path: "company", select: "name" }
        }
      ])
      .exec((err, employee) => {
        if (err || !employee) {
          return res.status(404).json({
            success: false,
            message: err
          });
        }
        return res.status(200).json({
          success: true,
          employee: employee
        });
      });
  }
};
