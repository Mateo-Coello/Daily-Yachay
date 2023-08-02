const express = require('express'); 


const usersRouter = require('./users.router');
const eventsRouter = require('./events.router');
const commentsRouter = require('./comments.router');
const enrolleesRouter = require('./enrollees.router');
const eventCoversRouter = require('./eventCovers.router');
const googleAuthRouter = require('./googleAuth.router');


function routerApi(app) {
  const router = express.Router();
  app.use('/', router); 
  router.use('/users', usersRouter);
  router.use('/events', eventsRouter);
  router.use('/comments', commentsRouter);
  router.use('/enrollees', enrolleesRouter);
  router.use('/covers', eventCoversRouter);
  router.use('/google', googleAuthRouter);
}

module.exports = routerApi;
