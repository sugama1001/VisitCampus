const RegistrationPathModel = require('../models/registrationModel');

const RegistrationPathController = {
  getAllRegistrationPaths: async (req, res) => {
    try {
      const registrationPaths = await RegistrationPathModel.getAllRegistrationPaths();
      res.json(registrationPaths);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getRegistrationPathsByUniversityId: async (req, res) => {
    try {
      const { universityId } = req.params;
      const registrationPaths = await RegistrationPathModel.getRegistrationPathsByUniversityId(universityId);
      res.json(registrationPaths);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = RegistrationPathController;
