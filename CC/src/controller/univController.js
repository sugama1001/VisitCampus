const univModel = require("../models/univModel.js");

exports.getUniversities = async (req, res) => {
  try {
    const universities = await univModel.getAllUniversities();
    const formattedData = await Promise.all(
      universities.map(async (university) => {
        const universityId = university.university_id;
        const achievements = await univModel.getUniversityAchievements(universityId);
        const alumniProfiles = await univModel.getAlumniProfiles(universityId);
        const registrationPaths = await univModel.getRegistrationPaths(universityId);
        const faculties = await univModel.getFaculties(universityId);

        return {
          university_id: university.university_id,
          univ_name: university.univ_name,
          personality_univ: university.personality_univ,
          univLogo: university.univLogo,
          univCover: university.univCover,
          latitude: university.latitude,
          longitude: university.longitude,
          achievement_university: achievements,
          profile_alumnus: alumniProfiles,
          registration_path: registrationPaths,
          faculties: faculties,
        };
      })
    );

    const jsonResponse = JSON.stringify(formattedData, null, 2);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(jsonResponse);
  } catch (error) {
    console.error("Error fetching universities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUniversityById = async (req, res) => {
  try {
    const universityId = req.params.universityId;

    if (!universityId) {
      const universities = await univModel.getAllUniversities();
      const formattedData = universities.map((university) => ({
        university_id: university.university_id,
        univ_name: university.univ_name,
        personality_univ: university.personality_univ,
        univLogo: university.univLogo,
        univCover: university.univCover,
        latitude: university.latitude,
        longitude: university.longitude,
      }));

      const jsonResponse = JSON.stringify(formattedData, null, 2);
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(jsonResponse);
    } else {
      const university = await univModel.getUniversityById(universityId);

      if (!university) {
        res.status(404).json({ error: "University not found" });
        return;
      }

      const achievements = await univModel.getUniversityAchievements(universityId);
      const alumniProfiles = await univModel.getAlumniProfiles(universityId);
      const registrationPaths = await univModel.getRegistrationPaths(universityId);
      const faculties = await univModel.getFaculties(universityId);

      const formattedData = {
        university_id: university.university_id,
        univ_name: university.univ_name,
        personality_univ: university.personality_univ,
        univLogo: university.univLogo,
        univCover: university.univCover,
        latitude: university.latitude,
        longitude: university.longitude,
        achievement_university: achievements,
        profile_alumnus: alumniProfiles,
        registration_path: registrationPaths,
        faculties: faculties,
      };

      const jsonResponse = JSON.stringify(formattedData, null, 2);
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(jsonResponse);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};