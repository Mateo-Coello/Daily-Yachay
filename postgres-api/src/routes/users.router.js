const express = require('express');
const router = express.Router(); 
const usersController = require('../controllers/users.controller');

router
    .get('/', usersController.getUsers )
    .get('/userById/:id', usersController.getUserById )
    .post('/', usersController.createUser )
    .put('/:id', usersController.updateUser )
    .delete('/:id', usersController._deleteUser );

module.exports = router;
