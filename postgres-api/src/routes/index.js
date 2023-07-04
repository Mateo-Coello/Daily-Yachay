const express = require('express'); 

const usersRouter = require('./users.router');
const eventsRouter = require('./events.router');
const commentsRouter = require('./comments.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/', router); 
  router.use('/users', usersRouter);
  router.use('/events', eventsRouter);
  router.use('/comments', commentsRouter);
}

module.exports = routerApi;
