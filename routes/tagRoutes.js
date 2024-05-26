const express = require("express");
const router = express.Router();
const tagsController = require("../controllers/tagsController");

// get all tags exited
router.get("/", tagsController.getTags);

module.exports = router;
