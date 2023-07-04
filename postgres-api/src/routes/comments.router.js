const express = require('express');
const router = express.Router(); 
const commentsController = require('../controllers/comments.controller');

router
    .get('/:eventId', commentsController.getComments )
    .get('/:commentId/:eventId', commentsController.getCommentsChildren )
    .post('/', commentsController.createComment )
    .put('/:commentdId', commentsController.updateComment )
    .delete('/:commentId', commentsController._deleteComment );

module.exports = router;