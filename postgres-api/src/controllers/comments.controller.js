const CommentsService = require('../services/comments.service');

const service = new CommentsService();

const createComment = async ( req, res ) => {
  try { 
      const response = await service.create(req.body);
      res.json({ success: true, data: response});
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}

const getComments = async (req, res) => {
  try {
      const { eventId } = req.params; 
      const response = await service.findComments(eventId);
      res.json(response);
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}

const getChildrenComments = async (req, res) => {
  try {
      const { commentId, eventId } = req.params; 
      const response = await service.findChildrenComments(commentId, eventId);
      res.json(response);
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}

const updateComment = async (req, res) => {
  try {
      const { commentId } = req.params; 
      const response = await service.update(commentId);
      res.json(response);
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}

const _deleteComment = async (req, res) => {
  try {
      const { commentId } = req.params; 
      const response = await service.delete(commentId);
      res.json(response);
  } catch (error) {
      res.status(500).send({ success: false, message: error.message });
  }
}

module.exports = {
  createComment, updateComment, _deleteComment, getComments, getChildrenComments,
};