const express = require('express');
const router = express.Router(); 
const enrolleesController = require('../controllers/enrollees.controller');

router
    .get('/:eventId', enrolleesController.getEnrollees )
    .get('/:eventId', enrolleesController.getNumberEnrollees )
    .post('/', enrolleesController.addEnrollee )
    .delete('/:userId/:eventId', enrolleesController._deleteEnrollee);

module.exports = router;