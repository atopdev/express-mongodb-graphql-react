const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const config = require('../../config');

const resolvers = {
  Query: {
    async me (_, args, { user }) {
      if (!user) {
        throw new Error('You are not authenticated!');
      }

      return await User.findById(user.id).exec();
    }
  },

  Mutation: {
    async signup (_, { username, email, password }) {
      const user = await (new User({
        username,
        email,
        password,
      })).save();

      const token = user.token();

      return {
        user,
        token,
      }
    },

    async login (_, { email, password }) {
      if (!email) throw new Error({ message: 'Email is required' });

      const user = await User.findOne({ email }).exec();

      if (password) {
        if (!user) {
          throw new Error('No user with that email');
        } else if (!await user.passwordMatches(password)) {
          throw new Error('Incorrect password');
        } else {
          return { user, token: user.token() };
        }
      } else {
        throw new Error('Incorrect credentials');
      }
    }
  }
}

module.exports = resolvers;
