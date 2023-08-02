const EventCoversService = require('../services/eventCovers.service');


const service = new EventCoversService();


const getEventCovers = async (req, res) => {
  try {
    const { eventId } = req.params;
    const response = await service.getCovers(eventId);
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};


const addCover = async (req, res) => {
  try {
    const response = await service.create(req.body);
    res.json({ success: true, data: response });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};




const updateCover = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const response = await service.update(id, body);
    res.json(response);
  } catch (error) {
    console.error('Error al actualizar la portada:', error);
    res.status(500).json({ error: 'Error al actualizar la portada' });
  }
};



const deleteCover = async (req, res) => {
  try {
    const { coverId } = req.params;

    await service.delete(coverId);

    const data = await s3
      .deleteObject({
        Bucket: 'dailyyachayimagenes',
        Key: `covers/${coverId}`,
      })
      .promise();

    console.log('Portada eliminada del servidor:', data);

    res.json({ message: 'Portada eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la portada:', error);
    res.status(500).json({ error: 'Error al eliminar la portada' });
  }
};

module.exports = {
  getEventCovers,
  addCover,
  updateCover,
  deleteCover
};
