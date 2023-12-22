const db = require('../config/database');

const FacultyModel = {
  getAllFaculties: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM faculty', (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });
  },

  getFacultiesByUniversityId: (universityId) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM faculty WHERE university_id = ?', [universityId], (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });
  },
};

module.exports = FacultyModel;
