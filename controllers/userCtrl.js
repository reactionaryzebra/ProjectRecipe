const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/auth", (req, res) => {
  console.log("route hit");
  res.render("/user/auth");
});

module.exports = router;
