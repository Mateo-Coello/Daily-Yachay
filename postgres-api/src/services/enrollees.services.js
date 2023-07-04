const { models } = require('../libs/sequelize');

class EnrolleesService { 
  
  constructor() {}

  async fetchEnrollees(e_id) {
    const res = await models.Enrollees.findAll({
      where: { e_id: e_id },
      include: [
        {
          model: models.Users,
          as: 'users',
        },
        {
          model: models.Events,
          as: 'events',
        },
      ],
    });
    return res;
  }

  async fetchNumberEnrollees(id) {
    const count = await models.Enrollees.count({
      where: { id: id }
    });
    return count;
  }

  async create(data) {
    const res = await models.Enrollees.create(data);
    return res;
  }

  async delete(u_id, e_id) {
    const model = await this.findOne({where: {u_id: u_id, e_id: e_id}});
    await model.destroy();
    return { deleted: true };
  }

}

module.exports = EnrolleesService;