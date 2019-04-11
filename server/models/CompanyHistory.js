const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanyHistorySchema = new Schema(
  {
    employee: { type: Schema.Types.ObjectId, ref: "Employee" },
    company: { type: Schema.Types.ObjectId, ref: "Company" },
    joiningDate: { type: Number, default: Date.now },
    leavingDate: { type: Number }
  },
  { timestamps: true }
);

const CompanyHistory = mongoose.model("CompanyHistory", CompanyHistorySchema);
module.exports = CompanyHistory;
