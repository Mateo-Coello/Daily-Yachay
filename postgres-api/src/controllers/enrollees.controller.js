const EnrolleesService = require('../services/enrollees.service');

const service = new EnrolleesService();

const addEnrollee = async ( req, res ) => {
  try { 
      const response = await service.create(req.body);
      res.json({ success: true, data: response});
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}

const getEnrollees = async (req, res) => {
  try {
      const { eventId } = req.params; 
      const response = await service.fetchEnrollees(eventId);
      res.json(response);
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}

const getNumberEnrollees = async (req, res) => {
  try {
      const { eventId } = req.params; 
      const response = await service.fetchNumberEnrollees(eventId);
      res.json(response);
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}

const _deleteEnrollee = async (req, res) => {
  try {
      const { userId, eventId } = req.params; 
      const response = await service.delete(userId, eventId);
      res.json(response);
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}

module.exports = {
  addEnrollee, _deleteEnrollee, getEnrollees, getNumberEnrollees,
};