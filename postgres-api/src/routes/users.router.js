const express = require('express');
const router = express.Router(); 
const usersController = require('../controllers/users.controller');
const auth = require('../controllers/googleAuth.controller');

router
    .get('/', usersController.getUsers)
    .post('/', usersController.createUser )
    .put('/:id', usersController.updateUser )
    .delete('/:id', usersController._deleteUser );

// Middleware
router.use(auth.authenticateUserMiddleware);
router
    .get('/email',usersController.getUserProfile);

module.exports = router;
