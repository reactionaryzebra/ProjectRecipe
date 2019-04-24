const express = require("express");
const router = express.Router();

router.get("/auth", (req, res) => {
  console.log("route hit");
  res.render("/user/auth");
});

module.exports = router;
