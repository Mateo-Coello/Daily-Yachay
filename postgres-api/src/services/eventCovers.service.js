const { models } = require('../libs/sequelize');

class EventCoversService { 
  
    constructor() {}

    async create(data) {
      const res = await models.EventCovers.create(data);
      return res;
    }

    async getCovers(e_id){
      const res = await models.EventCovers.findAll({where: {e_id}});
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
  
  module.exports = EventCoversService;