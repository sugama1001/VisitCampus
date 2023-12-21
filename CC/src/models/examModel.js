const db = require('../config/database');

const getAllPracticeExams = (callback) => {
  const query = 'SELECT * FROM `practice exam`';
  db.query(query, (err, result) => {
    callback(err, result);
  });
};

const getPracticeExamQuestions = (practiceId, callback) => {
  const query = 'SELECT * FROM `question exam` WHERE practice_id = ?';
  db.query(query, [practiceId], (err, result) => {
    callback(err, result);
  });
};

const getExamResults = (practiceId, callback) => {
  const query = 'SELECT * FROM `result exam` WHERE practice_id = ?';
  db.query(query, [practiceId], (err, result) => {
    callback(err, result);
  });
};

module.exports = {
  getAllPracticeExams,
  getPracticeExamQuestions,
  getExamResults,
};