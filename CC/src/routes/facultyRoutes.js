const express = require('express');
const router = express.Router();
const FacultyController = require('../controller/facultyController');

// Route to get all faculties
router.get('/', FacultyController.getAllFaculties);

// Route to get faculties by university ID
router.get('/:universityId', FacultyController.getFacultiesByUniversityId);


module.exports = router;
