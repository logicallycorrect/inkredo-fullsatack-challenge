const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SALT_FACTOR = 10;
const bcrypt = require("bcrypt");

const employeeSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    currentCompany: { type: Schema.Types.ObjectId, ref: "CompanyHistory" },
    companyHistory: [{ type: Schema.Types.ObjectId, ref: "CompanyHistory" }]
  },
  { timestamps: true }
);

employeeSchema.methods.verifyPassword = function(employeePassword, cb) {
  bcrypt.compare(employeePassword, this.password, function(err, res) {
    // console.log(err);
    if (err) cb(err, false);
    cb(null, res);
  });
};

employeeSchema.pre("save", function(next) {
  var password = this.password;
  var self = this;

  if (this.isModified(this.password)) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    // console.log("debug 1.5", err, salt);
    bcrypt.hash(password, salt, function(err, hash) {
      // console.log("debug2", hash, err);
      // Store hash in your password DB.
      self.password = hash;
      next();
    });
  });
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
