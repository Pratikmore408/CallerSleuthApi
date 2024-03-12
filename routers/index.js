const express = require("express");
const router = express.Router();
const user = require("./userRouter");
const contact = require("./contactRouter");

router.use("/user", user);
router.use("/contact", contact);

module.exports = router;
