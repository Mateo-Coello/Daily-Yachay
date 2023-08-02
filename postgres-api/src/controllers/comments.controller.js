const CommentsService = require('../services/comments.service');

const service = new CommentsService();

const createComment = async ( req, res ) => {

  try { 
      const response = await service.create(req.body);
      console.log(response.dataValues);
      res.json({ success: true, data: response});
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}

const getComments = async (req, res) => {
  try {
      const { eventId } = req.params; 
      const response = await service.findCommentsByEventId(eventId);
      res.json(response);
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}

const getChildrenComments = async (req, res) => {
  try {
      const {  eventId } = req.params; 
      const response = await service.findChildrenComments(eventId);
      res.json(response);
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}

const updateComment = async (req, res) => {
  try {
      const { commentId } = req.body; 
      const response = await service.update(commentId);
      res.json(response);
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}


const deleteComment = async (req, res) => {
  try {
      const { commentId } = req.body; 
      console.log(commentId);
      const response = await service.delete(commentId);
      res.json(response);
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}

module.exports = {
  createComment, updateComment, deleteComment, getComments, getChildrenComments,
};