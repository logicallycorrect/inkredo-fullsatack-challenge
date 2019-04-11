const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema(
  {
    name: { type: String, required: true },
    currentEmployees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],
    pastEmployee: [{ type: Schema.Types.ObjectId, ref: "Employee" }]
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", CompanySchema);
module.exports = Company;
