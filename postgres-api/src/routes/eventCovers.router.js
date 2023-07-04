const express = require('express');
const router = express.Router(); 
const eventCoversController = require('../controllers/eventCovers.controller');

router
    .get('/:eventId', eventCoversController.getEventCovers )
    .post('/',  eventCoversController.addCover )
    .delete('/:coverId', eventCoversController._deleteCover)

module.exports = router;