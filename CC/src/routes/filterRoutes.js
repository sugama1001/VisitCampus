const express = require("express");
const filterController = require("../controller/filterController.js");
const router = express.Router();

router.get("/", filterController.filterUniversities);

module.exports = router;