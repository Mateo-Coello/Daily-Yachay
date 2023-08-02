const { models } = require('../libs/sequelize');
const sequelize = require('sequelize');
const { Op } = require('sequelize')

function inits(list) {
  return list.reduce((acc, _, index) => acc.concat([list.slice(0, index + 1)]), []);
}

function splitString(text) {
  const words = text.split(" ");
  const result = inits(words).map((segment) => segment.join(" "));
  return result;
}

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
          [models.Sequelize.Op.between]: [start_date, end_date],
        },
      },
    });
    return res;
  }

  // async findByOrganizer(organizer) {
  //   const res = await models.Events.findAll({where: {organizer: organizer}});
  //   return res;
  // }

  // Buscada por Organizador usando palabras Clave

  async findByFilters(
    ttlKeywords,
    orgKeywords,
    category,
    locKeywords,
    startDate,
    endDate
  ) {
    try {
      const ttlKeywordArray = ttlKeywords ? splitString(ttlKeywords) : [];
      const orgKeywordArray = orgKeywords ? splitString(orgKeywords) : [];
      const locKeywordArray = locKeywords ? splitString(locKeywords) : [];

      const whereClause = {};

      if (ttlKeywordArray.length > 0) {
        whereClause.title = {
          [Op.or]: ttlKeywordArray.map((keyword) => ({
            [Op.iLike]: `%${keyword}%`,
          })),
        };
      }

      if (orgKeywordArray.length > 0) {
        whereClause.organizer = {
          [Op.or]: orgKeywordArray.map((keyword) => ({
            [Op.iLike]: `%${keyword}%`,
          })),
        };
      }

      if (category) {
        whereClause.category = category;
      }

      if (locKeywordArray.length > 0) {
        whereClause.location = {
          [Op.or]: locKeywordArray.map((keyword) => ({
            [Op.iLike]: `%${keyword}%`,
          })),
        };
      }

      if (startDate && endDate) {
        whereClause.date = {
          [Op.between]: [startDate, endDate],
        };
      } else if (startDate) {
        whereClause.date = {
          [Op.gte]: startDate,
        };
      } else if (endDate) {
        whereClause.date = {
          [Op.lte]: endDate,
        };
      }

      const res = await models.Events.findAll({
        where: whereClause,
      });

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findByOrganizer(keywords) {
    try {
      const keywordArray = keywords.split(" ");

      const res = await models.Events.findAll({
        where: {
          organizer: {
            [Op.or]: keywordArray.map((keyword) => ({
              [Op.iLike]: `%${keyword}%`,
            })),
          },
        },
      });

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findByCategory(category) {
    const res = await models.Events.findAll({ where: { category: category } });
    return res;
  }

  async findByLocation(location) {
    const res = await models.Events.findAll({ where: { location: location } });
    return res;
  }

  async create(data) {
    const res = await models.Events.create(data);
    return res;
  }

  async update(id, data) {
    const model = await models.Events.findByPk(id);
    const res = await model.update(data);
    return res;
  }


  async delete(id) {
    const model = await models.Events.findByPk(id);
    await model.destroy();
    return { deleted: true };
  }
}
  
  module.exports = EventsService;