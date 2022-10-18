const express = require("express");
const router = express.Router();

const student = require("../services/student.service");

router.post("/", student.addStudents);
router.put("/select", student.selectStudents);
router.get("/schedule/:year", student.getSchedulingStudent);
module.exports = router;
