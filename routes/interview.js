const express = require("express");
const router = express.Router();

const interview = require("../services/interview.service");

router.get("/years", interview.getInterviewYears);
router.get("/", interview.getInterviews);
router.get("/:year", interview.getInterviewStudents);


module.exports = router;
