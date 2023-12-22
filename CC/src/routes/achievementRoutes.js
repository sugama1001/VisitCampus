const express = require('express');
const router = express.Router();
const AchievementController = require('../controller/achievementController');

// Route to get all achievements
router.get('/', AchievementController.getAllAchievements);

// Route to get achievements by university ID
router.get('/:universityId', AchievementController.getAllAchievementsByUniversityId);

module.exports = router;
