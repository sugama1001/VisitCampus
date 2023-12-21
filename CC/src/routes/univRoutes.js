const express = require("express");
const univController = require("../controller/univController.js");
const router = express.Router();

router.get("/", univController.getUniversities);
router.get("/:universityId", univController.getUniversityById);

module.exports = router;