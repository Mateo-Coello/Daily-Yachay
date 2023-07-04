const { models } = require('../libs/sequelize');

class CommentsService { 
  
    constructor() {}

    async findCommentsByEventId(e_id) {
      const res = await models.Comments.findAll({
        where: {
          e_id: e_id,
          parent_id: null
        },
        include: [
          {
            model: models.Users,
            as: 'user'
          }
        ]
      });
      return res;
    }  

    async findChildrenComments(id, e_id) {
      const res = await models.Comments.findAll({
        where: {
          parent_id: id,
           e_id: e_id
        },
        include: [
          {
            model: models.Users,
            as: 'user'
          }
        ]
      });
      return res
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
  
  module.exports = CommentsService;