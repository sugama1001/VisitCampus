const express = require('express');
const router = express.Router();
const MajorController = require('../controller/majorController');

// Route to get all majors
router.get('/', MajorController.getAllMajors);

// Route to get majors by faculty ID
router.get('/:facultyId', MajorController.getMajorsByFacultyId);

module.exports = router;
