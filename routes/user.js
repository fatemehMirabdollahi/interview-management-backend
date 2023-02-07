        const express = require("express");
        const router = express.Router();

const user = require("../services/user.service");

router.get("/whoiam", user.getUser);
router.get("/all", user.getAllUsers);
router.put("/", user.editUser);
router.post("/", user.addUser);
router.delete("/:username", user.deleteUser);
router.put("/self", user.editSelf);
module.exports = router;
