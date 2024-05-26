const express = require("express");
const router = express.Router();

// test that db is up, server is up, etc.
router.get("/", (req, res) => {
  console.log("successful!");
  res.status(200);
  res.json({ message: "successful" });
});

module.exports = router;
