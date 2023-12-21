const express = require('express');
const router = express.Router();
const RegistrationPathController = require('../controller/registrationController');

router.get('/', RegistrationPathController.getAllRegistrationPaths);
router.get('/:universityId', RegistrationPathController.getRegistrationPathsByUniversityId);

module.exports = router;
