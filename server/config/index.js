require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || '0.0.0.0',
  port: process.env.SERVER_PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || 'graphql_example',
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES || 15,
  mongo: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/db_dev',
  },
};

module.exports = config;
