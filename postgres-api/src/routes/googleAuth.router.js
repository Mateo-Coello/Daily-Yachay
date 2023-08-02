const express = require('express');
const router = express.Router();
const create = require('../controllers/createUserWithGoogle');
// Middleware
const auth = require('../controllers/googleAuth.controller');

router
    .post('/auth', auth.authenticateUserMiddleware)
    .post('/login', auth.authenticateUserMiddleware, create.createUserWithGoogle);


module.exports = router;
