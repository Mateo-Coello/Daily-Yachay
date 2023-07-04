const EventCoversService = require('../services/eventCovers.service');

const service = new EventCoversService();

const getEventCovers = async (req, res) => {
  try {
      const { eventId } = req.params; 
      const response = await service.findCovers(eventId);
      res.json(response);
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}

const addCover = async ( req, res ) => {
  try { 
      const response = await service.create(req.body);
      res.json({ success: true, data: response});
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}

const updateCover = async (req, res) => {
  try {
      const { id } = req.params;
      const body = req.body;
      const response = await service.update(id,body);
      res.json(response);
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}

const _deleteCover = async (req, res) => {
  try {
      const { coverId } = req.params; 
      const response = await service.delete(coverId);
      res.json(response);
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}

module.exports = {
  addCover, _deleteCover, updateCover, getEventCovers,
};
