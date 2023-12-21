const express = require('express');
const router = express.Router();
const examController = require('../controller/examController');

router.get('/', examController.getAllPracticeExams);

router.get('/:practiceId/questions', examController.getPracticeExamQuestions);

router.get('/:practiceId/results', examController.getExamResults);

module.exports = router;