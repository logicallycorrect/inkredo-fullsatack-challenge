const express = require("express");
const router = express.Router();

const employee = require("./employeeRoutes");
const company = require("./companyRoutes");
const companyHistory = require("./companyHistoryRoutes");

router.use(employee);
router.use(company);
router.use(companyHistory);

// router.get("/", (req, res) => {
//   res.render("index", "/static/");
// });

router.get("/", (req, res) => {
  // const path = "/static/";
  res.render("index");
});

module.exports = router;
