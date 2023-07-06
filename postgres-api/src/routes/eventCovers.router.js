const express = require('express');
const router = express.Router();
const eventCoversController = require('../controllers/eventCovers.controller');

router.get('/:eventId', eventCoversController.getEventCovers);
router.post('/', eventCoversController.addCover);
router.delete('/delete/:coverId', eventCoversController.deleteCover);

module.exports = router;
