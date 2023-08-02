const { S3 } = require('aws-sdk');
const fs = require('fs');
const EventCoversService = require('../services/eventCovers.service');
const { AWS } = require('../config/config');

const service = new EventCoversService();
const s3 = new S3(AWS); // Inicializa el cliente de AWS S3 con las credenciales de configuración

const getEventCovers = async (req, res) => {
  try {
    const { eventId } = req.params;
    const response = await service.getCovers(eventId);
    res.json(response);
  } catch (error) {
    console.error('Error al obtener las portadas:', error);
    res.status(500).json({ error: 'Error al obtener las portadas' });
  }
};


const addCover = async (req, res) => {
  try {
    const { eventId, imagePath } = req.body;

    const uploadParams = {
      Bucket: 'dailyyachayimagenes',
      Key: `covers/${eventId}/${Date.now()}_${imagePath}`,
      Body: fs.readFileSync(imagePath),
      ContentType: 'image/jpeg'
    };

    const data = await s3.upload(uploadParams).promise();
    const coverPath = data.Location;

    const response = await service.create({ eventId, coverPath });
    res.json({ success: true, data: response });
  } catch (error) {
    console.error('Error al agregar la portada:', error);
    res.status(500).json({ error: 'Error al agregar la portada' });
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
