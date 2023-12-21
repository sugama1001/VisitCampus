const examModel = require('../models/examModel');

exports.getAllPracticeExams = (req, res) => {
  examModel.getAllPracticeExams((err, result) => {
    if (err) {
      console.error('Error querying database: ' + err.message);
      res.status(500).send('Error querying database');
    } else {
      const formattedResult = JSON.stringify(result, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResult);
    }
  });
};

exports.getPracticeExamQuestions = (req, res) => {
  const practiceId = req.params.practiceId;
  examModel.getPracticeExamQuestions(practiceId, (err, result) => {
    if (err) {
      console.error('Error querying database: ' + err.message);
      res.status(500).send('Error querying database');
    } else {
      const formattedResult = JSON.stringify(result, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResult);
    }
  });
};

exports.getExamResults = (req, res) => {
  const practiceId = req.params.practiceId;
  examModel.getExamResults(practiceId, (err, result) => {
    if (err) {
      console.error('Error querying database: ' + err.message);
      res.status(500).send('Error querying database');
    } else {
      const formattedResult = JSON.stringify(result, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResult);
    }
  });
};