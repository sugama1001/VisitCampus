// alumniModel.js
const db = require('../config/database');

const AlumniModel = {
  getAllAlumniProfiles: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM `profile-alumnus`', (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });
  },

  getAllAlumniProfilesByUniversityId: (universityId) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM `profile-alumnus` WHERE university_id = ?', [universityId], (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });
  },
};

module.exports = AlumniModel;
