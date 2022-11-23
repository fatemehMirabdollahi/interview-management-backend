const express = require("express");
const router = express.Router();

const comment = require("../services/comment.service");

router.post("/", comment.addComment);
router.get("/:id", comment.getComments);

module.exports = router;
