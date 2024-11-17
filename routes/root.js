const express = require("express");
const router = express.Router();
const path = require("path");

// default greeting root route
router.get("^/$|/index(.html)?", (_, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
