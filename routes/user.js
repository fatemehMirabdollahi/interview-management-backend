const express = require("express");
const router = express.Router();

const user = require("../services/user.service");

router.get("/whoiam",user.getUser)
router.get("/all",user.getAllUsers)
module.exports = router;
