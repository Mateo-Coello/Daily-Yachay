const express = require('express');
const router = express.Router(); 
const eventsController = require('../controllers/events.controller');

router
  .get("/:id", eventsController.getEventById)
  .get("/today/:currentDate", eventsController.getTodayEvents)
  .get("/previous/:currentDate", eventsController.getPreviousEvents)
  .get("/future/:currentDate", eventsController.getFutureEvents)
  .get("/range/:startDate/:endDate", eventsController.getEventsByRange)
  .get(
    "/filters/ttl=:title?/org=:organizer?/cat=:category?/loc=:location?/startD=:startDate?/endD=:endDate?",
    eventsController.getEventsByFilters
  )
  .get("/organizer/:organizer", eventsController.getEventsByOrganizer)
  .get("/category/:category", eventsController.getEventsByCategory)
  .get("/location/:location", eventsController.getEventsByLocation)
  .post("/", eventsController.createEvent)
  .put("/:id", eventsController.updateEvent)
  .delete("/:id", eventsController._deleteEvent);

module.exports = router;