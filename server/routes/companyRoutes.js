const express = require("express");
const router = express.Router();

const employeeController = require("../controller/employeeController");
const companyController = require("../controller/companyController");

// add new company
router.post(
  "/companies",
  employeeController.isLoggedIn,
  companyController.createCompany
);

// get single company
router.get("/companies/:company_id", companyController.getSingleCompany);

// get all companies
router.get("/companies", companyController.allCompanies);

module.exports = router;
