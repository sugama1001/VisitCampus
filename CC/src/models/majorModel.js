const db = require('../config/database');

const MajorModel = {
  getAllMajors: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM major', (err, results) => {
        if (err) {
          return reject(err); // Mengembalikan error jika terjadi kesalahan pada query
        }
        resolve(results);
      });
    });
  },

  getMajorsByFacultyId: (facultyId) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM major WHERE faculty_id = ?', [facultyId], (err, results) => {
        if (err) {
          return reject(err); // Mengembalikan error jika terjadi kesalahan pada query
        }
        resolve(results);
      });
    });
  },
};

module.exports = MajorModel;
