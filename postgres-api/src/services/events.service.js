const { models } = require('../libs/sequelize');
// const sequelize = require('sequelize')

class EventsService { 
  
    constructor() {}

    async findEvent(id) {
      const res = await models.Events.findByPk(id);
      return res;
    }

    async findTodayEvents(date) {
      const res = await models.Events.findAll({
        where: sequelize.literal(`date = '${date}'`),
      });
      return res;
    }

    async findPreviousEvents(date) {
      const res = await models.Events.findAll({
        where: sequelize.literal(`date < '${date}'`),
      });
      return res;
    }

    async findFutureEvents(date) {
      const res = await models.Events.findAll({
        where: sequelize.literal(`date > '${date}'`),
      });
      return res;
    }

    async findEventsRange(start_date, end_date) {
      const res = await models.Events.findAll({
        where: {
          date: {
            [models.Sequelize.Op.between]: [start_date, end_date]
          }
        }
      });
      return res;
    }
    
    async findByOrganizer(organizer) {
      const res = await models.Events.findAll({where: {organizer: organizer}});
      return res;
    }

    async findByCategory(category) {
      const res = await models.Events.findAll({where: {category: category}});
      return res;
    }

    async findByLocation(location) {
      const res = await models.Events.findAll({where: {location: location}});
      return res;
    }

    async create(data) {
      const res = await models.Events.create(data);
      return res;
    }

    async update(id, data) {
      const model = await this.findOne(id);
      const res = await model.update(data);
      return res;
    }

    async delete(id) {
      const model = await this.findOne(id);
      await model.destroy();
      return { deleted: true };
    }
  
  }
  
  module.exports = EventsService;