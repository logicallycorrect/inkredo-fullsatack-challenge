const Local = require("passport-local").Strategy;
const Employee = require("../models/Employee");

module.exports = function(passport) {
  passport.serializeUser(function(employee, done) {
    done(null, employee._id);
  });

  passport.deserializeUser(function(id, done) {
    Employee.findById(id, function(err, employee) {
      done(err, employee);
    });
  });

  passport.use(
    new Local(function(username, password, done) {
      Employee.findOne({ username: username }, function(err, employee) {
        if (err) {
          return done(err);
        }
        if (!employee) {
          return done(null, false, {
            message: "Wrong Username. Please Check The Username!"
          });
        }
        employee.verifyPassword(password, function(err, isMatched) {
          if (!isMatched) {
            return done(null, false, {
              message:
                "Wrong Password. Please Check The Password And Try Again!"
            });
          }
          return done(null, employee, { message: "" });
        });
      });
    })
  );
};
