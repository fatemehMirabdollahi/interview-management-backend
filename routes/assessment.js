const express = require("express");
const router = express.Router();

const assessment = require("../services/assessment.service");

router.get("/student/:docnumber", assessment.getAssessment);
router.post("/student/:docnumber", assessment.applyAssessment);
router.get("/fields", assessment.getfields);
module.exports = router;
