const EventsService = require('../services/events.service');
const service = new EventsService();

const createEvent = async ( req, res ) => {
  try { 
      const response = await service.create(req.body);
      res.json({ success: true, data: response});
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}

const getEventById = async ( req, res ) => {
    try {
        const { id } = req.params;
        const response = await service.findEvent(id);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const getTodayEvents = async ( req, res ) => {
  try {
      const { currentDate }= req.params;
      const response = await service.findTodayEvents(currentDate);
      res.json(response);
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}

const getPreviousEvents = async ( req, res ) => {
  try {
      const { currentDate }= req.params;
      const response = await service.findPreviousEvents(currentDate);
      res.json(response);
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}

const getFutureEvents = async ( req, res ) => {
  try {
      const { currentDate }= req.params;
      const response = await service.findFutureEvents(currentDate);
      res.json(response);
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}

const getEventsByFilters = async (req, res) => {
  try {
    const { title, organizer, category, location, startDate, endDate } =
      req.params;
    const response = await service.findByFilters(
      title,
      organizer,
      category,
      location,
      startDate,
      endDate
    );
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getEventsByRange = async ( req, res ) => {
  try {
      const { startDate, endDate } = req.params;
      const response = await service.findEventsRange(startDate, endDate);
      res.json(response);
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}

// const getEventsByOrganizer = async ( req, res ) => {
//   try {
//       const { organizer } = req.params;
//       const response = await service.findByOrganizer(organizer);
//       res.json(response);
//   } catch (error) {
//       res.status(500).send({ success: false, message: error.message });
//   }
// }

const getEventsByOrganizer = async (req, res) => {
    try {
      const { organizer } = req.params;
      const response = await service.findByOrganizer(organizer);
      res.json(response);
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
  };


const getEventsByCategory = async ( req, res ) => {
  try {
      const { category } = req.params;
      const response = await service.findByCategory(category);
      res.json(response);
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}

const getEventsByLocation= async ( req, res ) => {
  try {
      const { location } = req.params;
      const response = await service.findByLocation(location);
      res.json(response);
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}

const updateEvent = async (req, res) => {
  try {
      const { id } = req.params;
      const body = req.body;
      const response = await service.update(id,body);
      res.json(response);
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}

const _deleteEvent = async (req, res) => {
  try {
      const { id } = req.params; 
      const response = await service.delete(id);
      res.json(response);
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}

module.exports = {
  createEvent,
  updateEvent,
  _deleteEvent,
  getEventById,
  getTodayEvents,
  getPreviousEvents,
  getFutureEvents,
  getEventsByFilters,
  getEventsByRange,
  getEventsByOrganizer,
  getEventsByCategory,
  getEventsByLocation,
};