const univModel = require("../models/univModel.js");

exports.filterUniversities = async (req, res) => {
  try {
    const filters = req.query;

    if (Object.keys(filters).length === 0) {
      return res.status(400).json({ error: "At least one filter parameter is required" });
    }

    const universities = await univModel.getUniversitiesByFilters(filters);

    if (!universities || universities.length === 0) {
      return res.status(404).json({ error: "No universities found for the specified filters" });
    }

    const formattedData = await Promise.all(
      universities.map(async (university) => {
        const universityId = university.university_id;
        try {
          const faculties = await univModel.getFaculties(universityId);
          console.log(`Faculties for university ID ${universityId}:`, faculties);

          return {
            university_id: university.university_id,
            univ_name: university.univ_name,
            accreditation_univ: university.accreditation_univ,
            personality_univ: university.personality_univ,
            univLogo: university.univLogo,
            univCover: university.univCover,
            latitude: university.latitude,
            longitude: university.longitude,
            faculties: faculties,
          };
        } catch (error) {
          console.error(
            "Error fetching data for university ID",
            universityId,
            ":",
            error
          );
         
          return {
            university_id: universityId,
            error: "Internal Server Error for University ID " + universityId,
          };
        }
      })
    );

    const jsonResponse = JSON.stringify(formattedData, null, 2);

    res.setHeader("Content-Type", "application/json");
    res.status(200).send(jsonResponse);
  } catch (error) {
    console.error("Error filtering universities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};