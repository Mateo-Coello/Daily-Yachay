const express = require('express');
const router = express.Router(); 
const eventsController = require('../controllers/events.controller');

router
    .get('/:id', eventsController.getEventById )
    .get('/:currentDate', eventsController.getTodayEvents )
    .get('/:currentDate', eventsController.getPreviousEvents )
    .get('/:currentDate', eventsController.getFutureEvents )
    .get('/:startDate/:endDate', eventsController.getEventsByRange )
    .get('/:organizer', eventsController.getEventsByOrganizer )
    .get('/:category', eventsController.getEventsByCategory )
    .get('/:location', eventsController.getEventsByLocation )
    .post('/', eventsController.createEvent )
    .put('/:id', eventsController.updateEvent )
    .delete('/:id', eventsController._deleteEvent );

module.exports = router;