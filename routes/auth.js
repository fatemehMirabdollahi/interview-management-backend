const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();

const auth = require("../services/auth.service");

router.post("/login", auth.login);
module.exports = router;
