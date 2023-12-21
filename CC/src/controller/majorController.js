const MajorModel = require('../models/majorModel');

const MajorController = {
  getAllMajors: async (req, res) => {
    try {
      const majors = await MajorModel.getAllMajors();
      if (majors.length === 0) {
        return res.status(404).json({ message: 'Tidak ada data jurusan' });
      }
      res.json(majors);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getMajorsByFacultyId: async (req, res) => {
    try {
      const { facultyId } = req.params;
      const majors = await MajorModel.getMajorsByFacultyId(facultyId);
      if (!majors || majors.length === 0) {
        return res.status(404).json({ message: 'Tidak ada data jurusan untuk fakultas ini' });
      }
      res.json(majors);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = MajorController;