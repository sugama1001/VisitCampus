const express = require('express');
const router = express.Router();
const AlumniController = require('../controller/alumniController');

router.get('/', AlumniController.getAllAlumniProfiles);
router.get('/:universityId', AlumniController.getAllAlumniProfilesByUniversityId);

module.exports = router;
