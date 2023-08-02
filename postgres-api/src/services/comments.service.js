const { models } = require('../libs/sequelize');
const { Op } = require('sequelize')

class CommentsService { 
  
    constructor() {}

    
    async create(data) {
      const res = await models.Comments.create(data);

      const user = await models.Users.findByPk(data.u_id);

      res.dataValues.user=user;
      
      return res;
    }

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

    async findChildrenComments(e_id) {
      const res = await models.Comments.findAll({
        where: {
          parent_id: { [Op.not]: null },
           e_id: e_id
        },
        include: [
          {
            model: models.Users,
            as: 'user'
          }
        ]
      });
      console.log(res);
      return res;
    }



    async update(id, data) {
      const model = await model.Comments.findOne(id);
      const res = await model.update(data);
      return res;
    }

    async delete(id) {
      const comment = await models.Comments.findOne({where: { id: id } });
        comment.destroy();
      return { deleted: true };
    }
  
  }
  
  module.exports = CommentsService;