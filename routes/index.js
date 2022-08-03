const moviesRouter = require('./movies');
const usersRouter = require('./users');
const authRouter = require('./auth');

// console.log(authRouter);
const setupRoutes = (app) => {
  // TEst routes ok
  app.use('/ok', (req, res) => res.status(200).send('Hello Word ok'));
  // Movie routes
  app.use('/api/movies', moviesRouter);
  // User routes
  // TODO
  app.use('/api/users', usersRouter);
  app.use('/api/auth',authRouter );
};

module.exports = {
  setupRoutes,
};
