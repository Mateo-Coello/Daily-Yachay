const express = require('express');
const router = express.Router(); 
const commentsController = require('../controllers/comments.controller');
const auth = require('../controllers/googleAuth.controller');

router
    .get('/:eventId', commentsController.getComments )
    .get('/childs/:eventId', commentsController.getChildrenComments );
    
// Middleware 
router.use(auth.authenticateUserMiddleware);
    router
        .post('/', commentsController.createComment )
        .put('/:commentdId', commentsController.updateComment )
        .delete('/delete', commentsController.deleteComment);

module.exports = router;