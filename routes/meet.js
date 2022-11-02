const express = require("express");
const router = express.Router();

const meet = require("../services/meet.service");

router.post("/", meet.addMeets);
router.get("/:year", meet.getMeets);

module.exports = router;
