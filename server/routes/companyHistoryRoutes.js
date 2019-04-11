const express = require("express");
const router = express.Router();

const employeeController = require("../controller/employeeController");
const companyHistoryController = require("../controller/companyHistoryController");

// join company
router.get(
  "/companies/:company_id/join",
  employeeController.isLoggedIn,
  companyHistoryController.joinCompany
);

// leave company
router.get(
  "/companies/:company_id/leave",
  employeeController.isLoggedIn,
  companyHistoryController.leaveCompany
);

module.exports = router;
