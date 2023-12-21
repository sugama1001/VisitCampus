require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/auth');
const facultyRoutes = require("./src/routes/facultyRoutes");
const majorRoutes = require("./src/routes/majorRoutes");
const achievementRoutes = require("./src/routes/achievementRoutes");
const alumniRoutes = require("./src/routes/alumniRoutes");
const registrationRoutes = require("./src/routes/registrationRoutes");
const examRoutes = require("./src/routes/examRoutes");
const univRoutes = require("./src/routes/univRoutes");
const filterRoutes = require("./src/routes/filterRoutes");

const app = express();

app.use(express.json());

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);

// Routes for Faculty
app.use("/faculties", facultyRoutes);

// Routes for Majors
app.use("/majors", majorRoutes);

// Routes for Achievements
app.use("/achievements", achievementRoutes);

// Routes for Alumni
app.use("/alumni", alumniRoutes);

// Routes for Registration Paths
app.use("/registration", registrationRoutes);

// Routes for Exam
app.use("/exams", examRoutes);

// Routes for University
app.use("/universities", univRoutes);

// Routes for University Filtering
app.use("/filter-univ", filterRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});