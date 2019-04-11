const express = require("express");
const router = express.Router();

const employeeController = require("../controller/employeeController");

router.post("/register", employeeController.createEmployee);
router.post("/login", employeeController.loginEmployee);
router.get("/loggedOut", employeeController.loggedOut);
router.get("/profile", employeeController.getEmployee);

module.exports = router;
