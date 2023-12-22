const FacultyModel = require('../models/facultyModel');

const FacultyController = {
    getAllFaculties: async (req, res) => {
      try {
        const faculties = await FacultyModel.getAllFaculties();
        res.json(faculties);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    },

    getFacultiesByUniversityId: async (req, res) => {
        try {
          const { universityId } = req.params;
          const faculties = await FacultyModel.getFacultiesByUniversityId(universityId);
    
          if (!faculties) {
            return res.status(404).json({ message: 'Fakultas tidak ditemukan' });
          }
    
          res.json(faculties);
        } catch (error) {
          res.status(500).json({ error: 'Internal server error' });
        }
      },
      
      getMajorsByFacultyId: async (req, res) => {
        try {
          const { facultyId } = req.params;
          const majors = await MajorModel.getMajorsByFacultyId(facultyId);
    
          if (!majors) {
            return res.status(404).json({ message: 'Jurusan tidak ditemukan' });
          }
    
          res.json(majors);
        } catch (error) {
          res.status(500).json({ error: 'Internal server error' });
        }
      },
    };
    
  
  module.exports = FacultyController;
