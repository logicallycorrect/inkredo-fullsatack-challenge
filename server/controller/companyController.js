const Employee = require("../models/Employee");
const Company = require("../models/Company");

module.exports = {
  createCompany: (req, res) => {
    const newCompany = new Company({
      ...req.body
    });
    newCompany.save((err, company) => {
      if (err) {
        return res.json({
          success: false,
          message: err
        });
      } else {
        return res.status(201).json({
          success: true,
          message: "Company Created."
        });
      }
    });
  },

  getSingleCompany: (req, res) => {
    const id = req.params.company_id;
    console.log(id, "new test");
    Company.findOne({ _id: id })
      .populate([
        {
          path: "currentEmployees",
          select: "name"
        },

        {
          path: "pastEmployee",
          select: "name"
        }
      ])
      .exec((err, company) => {
        if (err || !company) {
          return res.status(404).json({
            success: false,
            message: err
          });
        }
        return res.status(200).json({
          success: true,
          company: company
        });
      });
  },

  allCompanies: (req, res) => {
    Company.find({}, (err, company) => {
      if (err || !company) {
        return res.status(404).json({
          success: false,
          message: err
        });
      }
      return res.status(200).json({
        success: true,
        company: company
      });
    });
  }
}; // end of module exports
