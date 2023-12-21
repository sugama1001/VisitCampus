const AchievementModel = require('../models/achievementModel');

const AchievementController = {
  getAllAchievements: async (req, res) => {
    try {
      const achievements = await AchievementModel.getAllAchievements();
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getAllAchievementsByUniversityId: async (req, res) => {
    try {
      const { universityId } = req.params;
      const achievements = await AchievementModel.getAllAchievementsByUniversityId(universityId);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = AchievementController;
