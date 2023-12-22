const db = require("../config/database.js");

const getAllUniversities = () => {
  const query = "SELECT * FROM university";
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      if (err) {
        console.error("Error fetching universities:", err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getUniversityById = (universityId) => {
  const query = "SELECT * FROM university WHERE university_id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [universityId], (err, result) => {
      if (err) {
        console.error("Error fetching university by ID:", err);
        reject(err);
      } else {
        const university = result[0];
        resolve(university);
      }
    });
  });
};

const getUniversityAchievements = (universityId) => {
  const query =
    "SELECT * FROM `achievement-university` WHERE university_id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [universityId], (err, rows) => {
      if (err) {
        console.error("Error fetching university achievements:", err);
        reject(err);
      } else {
        const achievements = Array.isArray(rows) ? rows : [];
        const mappedAchievements = achievements.map((achievement) => ({
          achievement_id: achievement.achievement_id,
          achievement_name: achievement.achievement_name,
          achievement_date: achievement.achievement_date,
        }));
        resolve(mappedAchievements);
      }
    });
  });
};

const getAlumniProfiles = (universityId) => {
  const query = "SELECT * FROM `profile-alumnus` WHERE university_id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [universityId], (err, rows) => {
      if (err) {
        console.error("Error fetching alumni profiles:", err);
        reject(err);
      } else {
        const alumniProfiles = Array.isArray(rows) ? rows : [];
        const mappedAlumniProfiles = alumniProfiles.map((alumnus) => ({
          alumnus_id: alumnus.alumnus_id,
          alumnus_name: alumnus.alumnus_name,
          cohort: alumnus.cohort,
          career: alumnus.career,
        }));
        resolve(mappedAlumniProfiles);
      }
    });
  });
};

const getRegistrationPaths = (universityId) => {
  const query = "SELECT * FROM `registration-path` WHERE university_id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [universityId], (err, registrationPaths) => {
      if (err) {
        console.error("Error fetching registration paths:", err);
        reject(err);
      } else {
        const paths = Array.isArray(registrationPaths) ? registrationPaths : [];
        const mappedPaths = paths.map((registrationPath) => ({
          regis_id: registrationPath.regis_id,
          path_mandiri: registrationPath.path_mandiri,
          detail: registrationPath.detail,
        }));
        resolve(mappedPaths);
      }
    });
  });
};

const getFaculties = (universityId) => {
  const query = "SELECT * FROM `faculty` WHERE university_id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [universityId], async (err, faculties) => {
      if (err) {
        console.error("Error fetching faculties:", err);
        reject(err);
      } else {
        const mappedFaculties = await Promise.all(
          faculties.map(async (faculty) => {
            const majors = await getMajors(faculty.faculty_id);
            return {
              faculty_id: faculty.faculty_id,
              faculty_name: faculty.faculty_name,
              major: majors,
            };
          })
        );
        resolve(mappedFaculties);
      }
    });
  });
};

const getMajors = (facultyId) => {
  const query = "SELECT * FROM `major` WHERE faculty_id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [facultyId], (err, majors) => {
      if (err) {
        console.error("Error fetching majors:", err);
        reject(err);
      } else {
        const mappedMajors = majors.map((major) => ({
          major_id: major.major_id,
          major_name: major.major_name,
          accreditation_major: major.accreditation_major,
        }));
        resolve(mappedMajors);
      }
    });
  });
};

const getUniversitiesByFilters = (filters) => {
  const {
    type_univ,
    accreditation_univ,
    scope,
    major_name,
    accreditation_major,
  } = filters;

  const query = `
    SELECT
      u.*,
      u.accreditation_univ,
      f.faculty_name,
      m.major_name,
      m.accreditation_major
    FROM university u
    LEFT JOIN faculty f ON u.university_id = f.university_id
    LEFT JOIN major m ON f.faculty_id = m.faculty_id
    WHERE
      u.type_univ = ? AND
      u.accreditation_univ = ? AND
      f.scope = ? AND
      m.major_name = ? AND
      m.accreditation_major = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [type_univ, accreditation_univ, scope, major_name, accreditation_major],
      (err, result) => {
        if (err) {
          console.error("Error fetching universities by filters:", err);
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = {
  getAllUniversities,
  getUniversityById,
  getUniversityAchievements,
  getAlumniProfiles,
  getRegistrationPaths,
  getFaculties,
  getMajors,
  getUniversitiesByFilters,
};