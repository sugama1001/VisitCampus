const AlumniModel = require('../models/alumniModel');

const AlumniController = {
  getAllAlumniProfiles: async (req, res) => {
    try {
      const alumniProfiles = await AlumniModel.getAllAlumniProfiles();
      res.json(alumniProfiles);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getAllAlumniProfilesByUniversityId: async (req, res) => {
    try {
      const { universityId } = req.params;
      const alumniProfiles = await AlumniModel.getAllAlumniProfilesByUniversityId(universityId);

      if (!alumniProfiles) {
        return res.status(404).json({ message: 'Profil alumni tidak ditemukan' });
      }

      res.json(alumniProfiles);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = AlumniController;
