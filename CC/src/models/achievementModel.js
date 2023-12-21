const db = require('../config/database');

const AchievementModel = {
  getAllAchievements: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM `achievement-university`', (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });
  },

  getAllAchievementsByUniversityId: (universityId) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM `achievement-university` WHERE university_id = ?', [universityId], (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });
  },
};

module.exports = AchievementModel;
