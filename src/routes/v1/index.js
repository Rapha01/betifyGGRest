const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const gameRoute = require('./game.route');
const betRoute = require('./bet.route');
const tipRoute = require('./tip.route');
const messageRoute = require('./message.route');
const memberRoute = require('./member.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/games',
    route: gameRoute,
  },
  {
    path: '/messages',
    route: messageRoute,
  },
  {
    path: '/members',
    route: memberRoute,
  },
  {
    path: '/bets',
    route: betRoute,
  },
  {
    path: '/tips',
    route: tipRoute,
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
