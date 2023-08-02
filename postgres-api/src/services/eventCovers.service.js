const { models } = require('../libs/sequelize');

class EventCoversService {
  constructor() {}


  async create(data) {
    const res = await models.EventCovers.create(data);
    return res;
  }



  async getCovers(eventId) {
  try {
    const covers = await models.EventCovers.findAll({ where: { e_id: eventId } });
    return covers.map((cover) => cover.cover_path);
  } catch (error) {
    throw new Error("Error fetching covers from the database: " + error.message);
  }
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

module.exports = EventCoversService;
