const express = require("express");
const router = express.Router();

const student = require("../services/student.service");

router.post("/", student.addStudents);
router.put("/select", student.selectStudents);
module.exports = router;
