const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const jwt = require('express-jwt');
const config = require('./index');
const User = require('../api/models/user.model');
const GraphQLServer = require('../api/graphql');

const app = express();

app.use(logger(config.env === 'development' ? 'dev' : 'combined'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.use(cors());

app.use('/api', jwt({
  secret: config.jwtSecret,
  requestProperty: 'auth',
  credentialsRequired: false,
}));

app.use('/api', async (req, res, done) => {
  const userId = (req.auth && req.auth.sub ) ? req.auth.sub : undefined;
  const user = ( userId ) ? await User.findById(userId).exec() : undefined;
  req.context = {
    user: user,
  };
  done();
});

GraphQLServer.applyMiddleware({
  app,
  path: '/api',
});

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(403).send({
      message: 'Invalid token',
    });
  }
});

// if (config.env === 'production') {
//   app.use(express.static(path.join(__dirname, '../../build')));
//   app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });
// }

module.exports = app;
